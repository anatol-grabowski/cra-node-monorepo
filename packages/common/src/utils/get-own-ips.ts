import os, { NetworkInterfaceInfo } from 'os'

export function getOwnIps(): [ifaceName: string, ip: string][] {
  const res: [ifaceName: string, ip: string][] = []
  const ifaces = os.networkInterfaces()
  for (const [ifaceName, nets] of Object.entries(ifaces)) {
    for (const net of nets as NetworkInterfaceInfo[]) {
      if (net.family === 'IPv6') continue
      res.push([ifaceName, net.address])
    }
  }
  return res
}
