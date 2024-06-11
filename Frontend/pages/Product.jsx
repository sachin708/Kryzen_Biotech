import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Spinner,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";
import "./Products.css"; // Import the CSS file for additional styling

const Product = () => {
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
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh" // Full viewport height
        width="100vw" // Full viewport width
      >
        <Spinner size="xl" color="black.500" width="200px" height="200px" />
      </Box>
    );
  }

  if (err) {
    return <Text color="red.500">{err}</Text>;
  }

  return (
    <>
      <Heading as="h1" size="xl" className="heading">
        Product Page
      </Heading>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        }}
        gap={6}
        className="container"
      >
        {data?.data?.map((ele) => (
          <GridItem key={ele.id} className="item">
            <Box
              className="mainbox"
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <Image
                src={ele.image}
                alt={ele.name}
                className="image"
                borderRadius="md"
              />
              <Text fontWeight="bold" mt={2}>
                Name: {ele.name}
              </Text>
              <Text>Type: {ele.type}</Text>
              <Text>Price: ${ele.price}</Text>
              <Text>Description: {ele.description}</Text>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </>
  );
};

export default Product;
