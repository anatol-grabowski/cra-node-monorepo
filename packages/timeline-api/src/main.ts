import { listen } from './app'

async function main() {
  const port = Number(process.env.PORT) || 8081
  await listen(port)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
