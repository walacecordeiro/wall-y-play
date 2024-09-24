import { Badge } from "../../badge";

type propsTag = {
 data?: Array<{ id: number; name: string }>;
};

export default function Tag({ data }: propsTag) {
 return (
  <span className="flex flex-wrap gap-1">
   {data?.map((genre) => (
    <Badge className="rounded-full cursor-default" variant="outline" key={genre.id}>
     {genre.name}
    </Badge>
   ))}
  </span>
 );
}
