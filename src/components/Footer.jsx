import { Box, Flex, Text } from "@chakra-ui/react";

const Footer = () => {
    return (
        <Box bgColor="#F8F8F8" px={24} h="10vh">
            <Flex justifyContent="center" alignItems="center" h="full">
                <Text fontSize="sm" color="gray">Alan Resto © 2023 | Developed by Alan Creative</Text>
            </Flex>
        </Box>
    )
}

export default Footer