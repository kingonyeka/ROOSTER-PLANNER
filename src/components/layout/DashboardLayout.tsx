"use client";

import { Box, Flex } from "@chakra-ui/react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex minH="100vh" bg="#FFF">

     
      <Box w="260px" bg="white" borderRight="1px solid" borderColor="#D9E5F2">
        <Sidebar />
      </Box>

  
      <Flex flex="1" direction="column">
        <Box bg="white" borderBottom="1px solid" borderColor="#D9E5F2" overflow="visible" position="relative" zIndex={10}>
          <Topbar />
        </Box>

        <Box flex="1">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}
