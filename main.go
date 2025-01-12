package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/Fingertips18/go-starter/src/constants"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Todo struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Completed bool               `json:"completed"`
	Body      string             `json:"body"`
}

var collection *mongo.Collection

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file:", err)
	}

	MONGODB_URI := os.Getenv("MONGODB_URI")

	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	clientOptions := options.Client().ApplyURI(MONGODB_URI).SetServerAPIOptions(serverAPI)
	client, err := mongo.Connect(context.Background(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	defer client.Disconnect(context.Background())

	err = client.Ping(context.Background(), nil)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB server")

	collection = client.Database("go").Collection("todos")

	app := fiber.New()

	if os.Getenv("MODE") == "development" {
		CLIENT_URL := os.Getenv("CLIENT_URL")
		app.Use(cors.New(cors.Config{AllowOrigins: CLIENT_URL, AllowHeaders: "Origin, Content-Type, Accept"}))
	}

	app.Get(constants.GETTodos, getTodos)
	app.Get(constants.GETTodo, getTodo)
	app.Post(constants.POSTTodo, postTodo)
	app.Patch(constants.PATCHTodo, patchTodo)
	app.Delete(constants.DELETETodo, deleteTodo)

	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "5000"
	}

	if os.Getenv("MODE") == "production" {
		app.Static("/", "./client/dist")
	}

	log.Fatal(app.Listen("0.0.0.0:" + PORT))
}

func getTodos(c *fiber.Ctx) error {
	var todos []Todo

	cursor, err := collection.Find(context.Background(), bson.M{})

	if err != nil {
		return err
	}

	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var todo Todo
		if err := cursor.Decode(&todo); err != nil {
			return err
		}

		todos = append(todos, todo)
	}

	return c.JSON(todos)
}

func getTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid todo ID"})
	}

	var todo Todo

	filter := bson.M{"_id": objectID}

	err = collection.FindOne(context.Background(), filter).Decode(&todo)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return c.Status(404).JSON(fiber.Map{"error": "Todo not found"})
		}

		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch todo"})
	}

	return c.Status(200).JSON(todo)
}

func postTodo(c *fiber.Ctx) error {
	todo := new(Todo)

	if err := c.BodyParser(todo); err != nil {
		return err
	}

	if todo.Body == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Todo body is empty!"})
	}

	insertResult, err := collection.InsertOne(context.Background(), todo)
	if err != nil {
		return err
	}

	todo.ID = insertResult.InsertedID.(primitive.ObjectID)

	return c.Status(201).JSON(todo)
}

func patchTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid todo ID"})
	}

	var updateData struct {
		Completed *bool  `json:"completed"`
		Body      string `json:"body"`
	}
	if err := c.BodyParser(&updateData); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Failed to parse todo"})
	}

	filter := bson.M{"_id": objectID}

	var todo Todo
	err = collection.FindOne(context.Background(), filter).Decode(&todo)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Failed to retrieve todo'"})
	}

	update := bson.M{}
	if updateData.Completed != nil {
		update["completed"] = *updateData.Completed
	}
	if updateData.Body != "" {
		update["body"] = updateData.Body
	}

	_, err = collection.UpdateOne(context.Background(), filter, bson.M{"$set": update})
	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"success": true})
}

func deleteTodo(c *fiber.Ctx) error {
	id := c.Params("id")
	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid todo ID"})
	}

	filter := bson.M{"_id": objectID}

	_, err = collection.DeleteOne(context.Background(), filter)

	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"success": true})
}
