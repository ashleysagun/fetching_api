import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population').then((res) =>
        res.json(),
    
    
  
      ),
      
  })

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  const user_data=data.data
  

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID Nation</TableHead>
          <TableHead className="text-right">Nation</TableHead>
          <TableHead className="text-right">ID Year</TableHead>
          <TableHead className="text-right">Year</TableHead>
          <TableHead className="text-right">Population</TableHead>
          <TableHead className="text-right">Slug Nation</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {user_data.map((data, key) => (
          <TableRow key={key}>
            <TableCell className="font-medium">{data['ID Nation']}</TableCell>
            <TableCell className="text-right">{data.Nation}</TableCell>
            <TableCell className="text-right">{data['ID Year']}</TableCell>
            <TableCell className="text-right">{data.Year}</TableCell>
            <TableCell className="text-right">{data.Population}</TableCell>
            <TableCell className="text-right">{data['Slug Nation']}</TableCell>
          </TableRow>
        ))}
      </TableBody>
     
      </Table>
  )
}