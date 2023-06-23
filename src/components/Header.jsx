import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { IoRestaurantOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <Box position="relative">
            <Box bgColor="#00ACEE" px={24} h="5vh">
                <Flex gap={2} alignItems="center" h="full">
                    <Icon as={IoRestaurantOutline} color="white" boxSize={6} />
                    <Text color="white" fontSize="xl">Alan Resto</Text>
                </Flex>
            </Box>
            <Box px={24} boxShadow="base" h="5vh">
                <Flex alignItems="center" h="full">
                    <NavLink
                        to="/food"
                        style={({ isActive }) => {
                            return {
                                color: isActive ? "#00ACEE" : "black",
                                borderBottom: isActive ? "2px solid #00ACEE" : null,
                                padding: "6px 32px",
                                fontWeight: 500,
                            };
                        }}
                    >
                        Food
                    </NavLink>
                    <NavLink
                        to="/transaksi"
                        style={({ isActive }) => {
                            return {
                                color: isActive ? "#00ACEE" : "black",
                                borderBottom: isActive ? "2px solid #00ACEE" : null,
                                padding: "6px 32px",
                                fontWeight: 500,
                            };
                        }}
                    >
                        Transaksi
                    </NavLink>
                </Flex>
            </Box>
        </Box>
    )
}

export default Header