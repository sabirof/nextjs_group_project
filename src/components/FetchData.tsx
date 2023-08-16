import Questionblock from "@/components/Questionblock";
import useSWR from "swr";
import Head from "../../node_modules/next/head";


interface questioninterface {
  id: number;
  question: string;
  answer: string;
}

interface PathNameProps {
  pathname: string;
}

export default function Index({ pathname }: PathNameProps) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("language", pathname);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };
  const fetcher = (url: string) =>
    fetch(url, requestOptions).then((res) => {
      return res.json();
    });

  const { data, error } = useSWR("/api/staticdata", fetcher);
  // console.log("data :>> ", data);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <Head>
        <title key="title">`Questions on ${pathname}`</title>
      </Head>
      <h1>{`Questions on ${pathname}`}</h1>
      <div 
      // className="flex flex-wrap justify-center"
      >
        {data &&
          data.map((question: questioninterface) => {
            return (
              <div key={question.id}

              //  className="w-1/3 p-2"
               >
                <Questionblock questionx={question} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
