interface propsParams {
 params: { filme: string };
};

export default function Page({ params }: propsParams) {
 return <div>My Post: {params.filme}</div>;
}
