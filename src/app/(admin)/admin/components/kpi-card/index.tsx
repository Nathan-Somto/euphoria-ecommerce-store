import { Card,CardHeader,CardTitle,CardContent } from '@/components/ui/card'
import { formatter } from '@/utils/formatter'
import { LucideIcon } from 'lucide-react'
import React from 'react'

export default function KpiCard ({title, content, Icon, format}:KpiCardProps & {Icon: LucideIcon}) {
  return (
    <Card className="">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
        {title}
      </CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent className="text-ellipsis w-full">
      <p className="text-2xl font-bold">{ format ? formatter.format(content): content}</p>
    </CardContent>
  </Card>
  )
}
