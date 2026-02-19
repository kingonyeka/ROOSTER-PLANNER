"use client";

import {
  Box,
  Flex,
  IconButton,
  Text,
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
} from "@chakra-ui/react";
import { Category, Notification, Setting2, Logout, User } from "iconsax-reactjs";
import { FiChevronDown } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";




type HoverKey = "apps" | "settings" | "notifications" | null;

export function Topbar() {
  const [hovered, setHovered] = useState<HoverKey>(null);

  const iconColor = (key: Exclude<HoverKey, null>) =>
    hovered === key ? "#5653FC" : "#0F172A";
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  function handleClickOutside(e: MouseEvent) {
    if (!profileRef.current) return;
    if (!profileRef.current.contains(e.target as Node)) {
      setProfileOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  return (
    <Flex
      px="24px"
      py="14px"
      align="center"
      justify="space-between"
      bg="white"
      w="100%"
      h="100px"
    >
      <Box />

      <Flex align="center" gap="10px">
        <IconButton
          aria-label="Apps"
          variant="ghost"
          w="44px"
          h="44px"
          border="1px solid"
          borderColor="#F0F5FA"
          borderRadius="10px"
          bg="#F6FAFD"
          _hover={{ bg: "#F6FAFD" }}
          onMouseEnter={() => setHovered("apps")}
          onMouseLeave={() => setHovered(null)}
        >
          <Category size={24} color={iconColor("apps")} />
        </IconButton>

        <IconButton
          aria-label="Settings"
          variant="ghost"
          w="44px"
          h="44px"
          border="1px solid"
          borderColor="#F0F5FA"
          borderRadius="10px"
          bg="#F6FAFD"
          _hover={{ bg: "#F6FAFD" }}
          onMouseEnter={() => setHovered("settings")}
          onMouseLeave={() => setHovered(null)}
        >
          <Setting2 size={24} color={iconColor("settings")} />
        </IconButton>

        <IconButton
          aria-label="Notifications"
          variant="ghost"
          w="44px"
          h="44px"
          border="1px solid"
          borderColor="#F0F5FA"
          borderRadius="10px"
          bg="#F6FAFD"
          _hover={{ bg: "#F6FAFD" }}
          onMouseEnter={() => setHovered("notifications")}
          onMouseLeave={() => setHovered(null)}
        >
          <Notification size={24} color={iconColor("notifications")} />
        </IconButton>

       

        <Box position="relative" ref={profileRef}>
          <Flex
            align="center"
            gap="10px"
            ml="10px"
            px="10px"
            py="8px"
            borderRadius="10px"
            cursor="pointer"
            userSelect="none"
            _hover={{ bg: "#F8FAFC" }}
            onClick={() => setProfileOpen((prev) => !prev)}
          >
            <Box>
              <Text
                fontSize="13px"
                fontWeight={600}
                lineHeight="1.1"
                color="#0F172A"
              >
                Kingsley Ifeanyi
              </Text>
              <Text fontSize="12px" color="#64748B" lineHeight="1.1">
                kingsley@gmail.com
              </Text>
            </Box>

            <Box
              color="#94A3B8"
              transform={profileOpen ? "rotate(180deg)" : "rotate(0deg)"}
              transition="transform 0.2s ease"
            >
              <FiChevronDown size={18} />
            </Box>
          </Flex>

          {profileOpen && (
            <Box
              position="absolute"
              top="calc(100% + 10px)"
              right="0"
              w="220px"
              bg="white"
              border="1px solid"
              borderColor="#E2E8F0"
              borderRadius="14px"
              boxShadow="0px 12px 30px rgba(15, 23, 42, 0.12)"
              overflow="hidden"
              zIndex={9999}
            >
              <Flex
                px="14px"
                py="12px"
                gap="10px"
                align="center"
                cursor="pointer"
                _hover={{ bg: "#F8FAFC" }}
                onClick={() => {
                  setProfileOpen(false);
                  console.log("Profile clicked");
                }}
              >
                <User size={18} color="#475569" />
                <Text fontSize="14px" color="#0F172A">
                  Profile
                </Text>
              </Flex>

              <Flex
                px="14px"
                py="12px"
                gap="10px"
                align="center"
                cursor="pointer"
                _hover={{ bg: "#F8FAFC" }}
                onClick={() => {
                  setProfileOpen(false);
                  console.log("Settings clicked");
                }}
              >
                <Setting2 size={18} color="#475569" />
                <Text fontSize="14px" color="#0F172A">
                  Settings
                </Text>
              </Flex>

              <Box h="1px" bg="#EEF2F7" />

              <Flex
                px="14px"
                py="12px"
                gap="10px"
                align="center"
                cursor="pointer"
                _hover={{ bg: "#FEF2F2" }}
                onClick={() => {
                  setProfileOpen(false);
                  console.log("Logout clicked");
                }}
              >
                <Logout size={18} color="#EF4444" />
                <Text fontSize="14px" color="#EF4444">
                  Log out
                </Text>
              </Flex>
            </Box>
          )}
        </Box>


      </Flex>
    </Flex>
  );
}
