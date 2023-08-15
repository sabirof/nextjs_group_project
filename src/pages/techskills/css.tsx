import Questionblock from "@/components/Questionblock";
import useSWR from "swr";
import Head from "../../../node_modules/next/head";

interface url {}

interface cssquestion {
  id: number;
  question: string;
  answer: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Index() {
  const { data, error } = useSWR("/api/staticdata", fetcher);
  // console.log("data :>> ", data);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <Head>
        <title key="title">Questions on css</title>
      </Head>
      <h1>CSS questions</h1>
      <div>
        {data &&
          data.css.map((cssquestion: cssquestion) => {
            // console.log("cssquestion :>> ", cssquestion);
            return (
              <div key={cssquestion.id}>
                <Questionblock questionx={cssquestion} />
              </div>
            );
          })}
        {/*  <div>question: {data.css.question}</div>
         <div>answer: {data.css.answer}</div> */}
      </div>
    </div>
  );
}
