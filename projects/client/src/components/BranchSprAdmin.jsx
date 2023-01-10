import { Td, Tr } from "@chakra-ui/react";

const BranchSprAdmin = ({ branch_name, address }) => {
    return (
        <>
            <Tr height={"80px"}>
                <Td fontWeight={"bold"}>{branch_name || "Loading..."}</Td>
                <Td fontWeight={"bold"}>{address || "Loading..."}</Td>
            </Tr>
        </>
    );
};

export default BranchSprAdmin;
