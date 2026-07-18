import { connect } from "node:http2";
import { prisma } from "./lib/prisma.js";

async function main() {
    const category = await prisma.categories.create({
        data: {
            category: 'Test',
            posts: {}
        }
    });

    const post = await prisma.posts.create({
        data: {
            title: 'Testing',
            text: 'testing more things',
            category: {connect: {id: category.id}}
        }
    });
  // Create a new user with a post
  const user = await prisma.users.create({
    data: {
      username: "rich",
      password: "password123",
      comments: {
        create: {
          text: "Hello",
          username: "rich",
          post: {connect: {id: post.id}},
        },
      },
    },
    include: {
      comments: true,
    },
  });
  console.log("Created user:", user);
  // Fetch all users with their posts
  const allUsers = await prisma.users.findMany({
    include: {
      comments: true,
    },
  });
  console.log("All users:", JSON.stringify(allUsers, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });