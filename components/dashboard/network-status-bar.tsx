import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Activity, Fuel, Clock } from "lucide-react"

export function NetworkStatusBar() {
  return (
    <Card className="bg-card network-status-bar">
      <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4">
        <div className="flex items-center space-x-2">
          <Activity className="h-4 w-4 text-green-500" />
          <span className="font-medium">Network:</span>
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            Healthy
          </Badge>
        </div>

        <div className="flex items-center space-x-2">
          <Fuel className="h-4 w-4 text-yellow-500" />
          <span className="font-medium">Gas Fee:</span>
          <span>25 Gwei</span>
        </div>

        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-blue-500" />
          <span className="font-medium">Block:</span>
          <span>18,245,632</span>
        </div>
      </CardContent>
    </Card>
  )
}
