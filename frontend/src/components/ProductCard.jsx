import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bgColor = useColorModeValue('white', 'gray.800');
  return (
    <Box
      shadow={'lg'}
      rounded={'lg'}
      overflow={'hidden'}
      transition={'all 0.3s'}
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
      bg={bgColor}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w='full'
        objectFit={'cover'}
      ></Image>
      <Box p={4}>
        <Heading as='h3' size='md' mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={'bold'} fontSize={'xl'} color={textColor} mb={4}>
          $ {product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} colorScheme='blue' />
          <IconButton icon={<DeleteIcon />} colorScheme='red' />
        </HStack>
      </Box>
    </Box>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};
export default ProductCard;
