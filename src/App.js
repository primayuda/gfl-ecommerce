import {
  Container,
  Text,
  Divider,
  Box,
  Image,
  Button,
  SimpleGrid,
  Flex,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { FiShoppingCart, FiShoppingBag } from "react-icons/fi";
import { useState, useEffect } from "react";
import Butter from "buttercms";

const butter = Butter(process.env.REACT_APP_BUTTER_ECOMMERCE);

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await butter.content.retrieve(["poultry"], {
        order: "name",
      });
      const { data } = await res.data;
      const allProducts = data.poultry;
      setProducts(allProducts);
    }
    fetchData();
  }, []);

  return (
    <Container maxW="container.xl" h="100vh" >
      <Flex justifyContent="space-between" alignContent="center">
      <LinkBox>     
        <LinkOverlay href="https://globalfarmindolestari.com" isExternal>
          <Image
            boxSize='100px'
            objectFit='cover'
            borderRadius='full'
            shadow='lg'
            _hover={{ shadow: "dark-lg" }}
            src='https://res.cloudinary.com/primayuda/image/upload/v1669772023/GFL/logo_gfl_thjkwy.jpg'
            alt='Logo GFL'
          />
        </LinkOverlay>
      </LinkBox>
        <Button
          my="5px"
          colorScheme="green"
          variant="ghost"
          leftIcon={<FiShoppingBag size="24px" />}
          size="lg"
          p={2}
          className="snipcart-checkout"
        >
          View Cart
        </Button>
      </Flex>
      <Divider />
      <Box mt={4}>
        <SimpleGrid
          minChildWidth="300px"
          align="center"
          justify="center"
          spacing="40px"
          mb={32}
        >
          {products.map((product) => (
            <Box
              bg="white"
              maxW="sm"
              borderWidth="1px"
              rounded="lg"
              shadow="lg"
              _hover={{ shadow: "dark-lg" }}
              key={product.id}
            >
              <Image
                h="350px"
                fit="cover"
                src={product.image}
                alt={`Picture of ${product.name}`}
                roundedTop="lg"
              />

              <Box p="6">
                <Flex
                  mt="1"
                  justifyContent="center"
                  alignContent="center"
                >
                  <Text
                    fontSize="2xl"
                    fontWeight="semibold"
                    as="h4"
                    textTransform="uppercase"
                    lineHeight="tight"
                    fontFamily="Roboto"
                  >
                    {product.name}
                  </Text>
                </Flex>
                <Text
                  as="h4"
                  fontSize="2xl"
                  fontWeight="bold"
                  color="teal.600"
                >
                  IDR {product.price.toLocaleString()}
                </Text>

                <Text
                  mt={2}
                  color="gray.500"
                  display={{ base: "none", md: "flex" }}
                >
                  {product.description}
                </Text>

                <Button
                  leftIcon={<FiShoppingCart size="24px" />}
                  size="lg"
                  mt={4}
                  isFullWidth
                  colorScheme="blue"
                  variant="outline"
                  alignSelf={"center"}
                  className="snipcart-add-item"
                  data-item-id={product.id}
                  data-item-image={product.image}
                  data-item-name={product.name}
                  data-item-url="/"
                  data-item-description={product.description}
                  data-item-price={product.price}
                >
                  Add to Cart
                </Button>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
      <Divider />
      <Box mt={2} display='flex' justifyContent='space-between'>
        <Text>
          Copyright Global Farmindo Lestari @2022
        </Text>
        <LinkBox>
          <Text>Supported by:</Text>
          <LinkOverlay href="https://buttercms.com">
            <Image 
              boxSize='100px'
              objectFit='fit'
              src='https://res.cloudinary.com/primayuda/image/upload/v1672226012/GFL/butter-y_a1tqsy.png'
              alt="Butter CMS logo" 
            />
          </LinkOverlay>
        </LinkBox>
      </Box>
    </Container>
  );
}

export default App;
