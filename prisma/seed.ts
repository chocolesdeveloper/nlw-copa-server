import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "JohnDoe@gmail.com",
      avatarUrl: "https://github.com/chocolesdeveloper.png",
    },
  })

  const pool = await prisma.pool.create({
    data: {
      title: "Example pool",
      code: "BOL123",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  })

  await prisma.game.create({
    data: {
      date: "2022-11-12T12:00:00.372Z",
      firstTeamCountryCode: "DE",
      secondTeamCountryCode: "BR",
    },
  })

  await prisma.game.create({
    data: {
      date: "2022-11-22T12:00:00.372Z",
      firstTeamCountryCode: "AR",
      secondTeamCountryCode: "BR",

      guesses: {
        create: {
          firstTeamPoints: 1,
          secondTeamPoints: 2,

          particinpant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  })
}

main()
