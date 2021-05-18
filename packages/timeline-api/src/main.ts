import { listen } from './app'

async function main() {
  const port = Number(process.env.PORT) || 8081
  const server = await listen(port)
}

main().catch((err) => {
  console.error('Unhandled error')
  console.error(err)
  process.exit(1)
})
