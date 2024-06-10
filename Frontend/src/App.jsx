import { useEffect, useState } from "react";
import { Box, Grid, GridItem, Spinner, Heading } from "@chakra-ui/react";
import "./App.css"; // Import the CSS file for styling

function App() {
  const [data, setData] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      let res = await fetch("http://localhost:8080/products/products");
      let data = await res.json();
      setLoading(false);
      setData(data);
    } catch (err) {
      setLoading(false);
      setErr("An error occurred");
    }
  };

  if (loading) {
    return <Spinner size="xl" color="blue.500" />;
  }

  if (err) {
    return <h2>{err}</h2>;
  }

  return (
    <>
      <Heading as="h2" size="md" class="headingtag">
        {" "}
        Product Page
      </Heading>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        }}
        gap={4}
        className="container"
      >
        {data?.data?.map((ele) => (
          <GridItem key={ele.id} className="item">
            <Box className="mainbox">
              <img src={ele.image} alt={ele.name} className="image" />
              <h3>Name:- {ele.name}</h3>
              <h3>Type:- {ele.type}</h3>
              <h3>Price:- {ele.price}</h3>
              <h4>Description:- {ele.description}</h4>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </>
  );
}

export default App;
