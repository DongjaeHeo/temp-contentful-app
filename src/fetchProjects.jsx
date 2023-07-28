import { useEffect, useState } from "react";

import { createClient } from "contentful";

const client = createClient({
  space: "oq86qipxsizs",
  environment: "master",
  accessToken: "n9lvuKt8vVKi1lBSQLaIuaMWKeMazFhFuUranW95uKM",
});

export const useFetchProjects = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const getData = async () => {
    try {
      const response = await client.getEntries({ content_type: "projects" });
      const projects = response.items.map((item) => {
        const { title, url, image } = item.fields;
        const id = item.sys.id;
        const img = image?.fields?.file?.url;
        return { title, url, id, img };
      });
      setLoading(false);
      setProjects(projects);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return { loading, projects };
};