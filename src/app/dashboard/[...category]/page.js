import React from "react";
import Category from "./Category";

const Page = async ({ params }) => {
  const { category } = await params;

  return (
    <>
      <Category category={category[0]} />
    </>
  );
};

export default Page;
