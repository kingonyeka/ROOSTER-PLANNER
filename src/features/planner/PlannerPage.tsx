"use client";

import {
  Box,
  Flex,
  Text,
  Button,
  HStack,
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
} from "@chakra-ui/react";

import { FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Add, Profile2User, FilterSearch } from "iconsax-reactjs";
import { useEffect, useRef, useState, useMemo } from "react";

import { CalendarDropdown } from "./CalendarDropdown";
import { CalendarGrid } from "./components/CalenderGrid";
// import { RosterPanel } from "./RosterPanel";

type TabMode = "Live" | "Planner";
type ViewMode = "day" | "week" | "month" | "custom";

function getMonthLabel(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function getWeekdayLabel(date: Date) {
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

function toISO(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function PlannerPage() {
  const [tab, setTab] = useState<TabMode>("Live");
  const [viewMode, setViewMode] = useState<ViewMode>("day");
  const [selectedDate, setSelectedDate] = useState(() => new Date("2025-09-08"));
  const [viewMenuOpen, setViewMenuOpen] = useState(false);
  const viewMenuRef = useRef<HTMLDivElement | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
const calendarRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  function handleOutsideClick(e: MouseEvent) {
    if (!calendarRef.current) return;
    if (!calendarRef.current.contains(e.target as Node)) {
      setCalendarOpen(false);
    }
  }

  document.addEventListener("mousedown", handleOutsideClick);
  return () => document.removeEventListener("mousedown", handleOutsideClick);
}, []);

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}


useEffect(() => {
  function handleClickOutside(e: MouseEvent) {
    if (!viewMenuRef.current) return;
    if (!viewMenuRef.current.contains(e.target as Node)) {
      setViewMenuOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  const isoDate = useMemo(() => toISO(selectedDate), [selectedDate]);

  const stripBg = tab === "Live" ? "#FFF5F5" : "#EEF2FF";
  const stripBorder = tab === "Live" ? "#FF6669" : "#A5B4FC";
  const activeTabBg = tab === "Live" ? "#EF4444" : "#4F46E5";

  const description =
    tab === "Live"
      ? "View what is happening right now."
      : "Plan and publish upcoming shifts.";

  return (
    <Box>
      <Flex
        justify="space-between"
        borderBottom="1px solid"
        borderColor="#D9E5F2"
        h="70px"
        align="center"
        px="30px"
        bg="white"
        mb="18px"
      >
        <Text fontSize="24px" fontWeight={700} color="#242424">
          Planner
        </Text>

        <HStack gap="10px">
          <Button
            variant="outline"
            borderRadius="8px"
            borderColor="#D9E5F2"
            display="flex"
            alignItems="center"
            gap="8px"
          >
            <FiChevronDown size={18} />
            Open days
          </Button>

          <Button
            variant="outline"
            borderRadius="8px"
            borderColor="#D9E5F2"
            display="flex"
            alignItems="center"
            gap="8px"
          >
            <Add size={18} />
            New
            <FiChevronDown size={18} />
          </Button>
        </HStack>
      </Flex>

      <Box mx="30px">
        <Flex
          mt="15px"
          align="center"
          bg={stripBg}
          border="1px solid"
          borderColor={stripBorder}
          p="6px"
          borderRadius="999px"
          w="full"
        >
          <Flex bg="white" p="4px" borderRadius="999px" gap="6px">
            {(["Live", "Planner"] as TabMode[]).map((option) => {
              const isActive = tab === option;

              return (
                <Flex
                  key={option}
                  align="center"
                  justify="center"
                  px="18px"
                  h="32px"
                  borderRadius="999px"
                  cursor="pointer"
                  bg={isActive ? activeTabBg : "transparent"}
                  transition="all 0.2s ease"
                  onClick={() => setTab(option)}
                  userSelect="none"
                >
                  <Text
                    fontSize="14px"
                    fontWeight={600}
                    color={isActive ? "white" : "#64748B"}
                    whiteSpace="nowrap"
                  >
                    {option}
                  </Text>
                </Flex>
              );
            })}
          </Flex>

          <Text
            fontSize="14px"
            color="#242424"
            pr="18px"
            whiteSpace="nowrap"
            ml="20px"
          >
            {description}
          </Text>
        </Flex>
      </Box>

      {/* <RosterPanel /> */}

      <Box mx="30px" mt="18px">
        <Flex align="center" justify="space-between">
          <Flex align="center" gap="12px">
            <Flex
              px="12px"
              h="32px"
              align="center"
              border="1px solid"
              borderColor="#D9E5F2"
              borderRadius="999px"
              bg="white"
              gap="8px"
            >
              <Text fontSize="13px" color="#64748B">
                {getWeekdayLabel(selectedDate)}
              </Text>

              <Flex
                w="22px"
                h="22px"
                align="center"
                justify="center"
                borderRadius="999px"
                bg="#F1F5F9"
              >
                <Text fontSize="12px" fontWeight={600} color="#0F172A">
                  {selectedDate.getDate()}
                </Text>
              </Flex>
            </Flex>

            <Text fontSize="20px" fontWeight={700} color="#0F172A">
              {getMonthLabel(selectedDate)}
            </Text>
          </Flex>

          <HStack gap="10px">
            <Button
              variant="outline"
              borderColor="#D9E5F2"
              borderRadius="10px"
              px="12px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Profile2User size={18} />
            </Button>

            <Button
              variant="outline"
              borderColor="#D9E5F2"
              borderRadius="10px"
              px="12px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FilterSearch size={18} />
            </Button>

            <Button
              variant="outline"
              borderColor="#D9E5F2"
              borderRadius="10px"
              onClick={() =>
                setSelectedDate((d) => new Date(d.getTime() - 86400000))
              }
            >
              <FiChevronLeft />
            </Button>

            <Box position="relative" ref={calendarRef}>
  <Button
    variant="outline"
    borderColor="#D9E5F2"
    borderRadius="10px"
    onClick={() => setCalendarOpen((prev) => !prev)}
  >
    Current day
  </Button>

  {calendarOpen && (
    <CalendarDropdown
      selectedDate={selectedDate}
      onChange={(d) => {
        setSelectedDate(d);
        setCalendarOpen(false);
      }}
    />
  )}
</Box>


            <Button
              variant="outline"
              borderColor="#D9E5F2"
              borderRadius="10px"
              onClick={() =>
                setSelectedDate((d) => new Date(d.getTime() + 86400000))
              }
            >
              <FiChevronRight />
            </Button>

            <Box position="relative" ref={viewMenuRef}>
  <Button
    variant="outline"
    borderColor="#D9E5F2"
    borderRadius="10px"
    display="flex"
    gap="10px"
    alignItems="center"
    onClick={() => setViewMenuOpen((prev) => !prev)}
  >
    <Box w="8px" h="8px" borderRadius="999px" bg="#22C55E" />

    {viewMode === "day"
      ? "This day"
      : viewMode === "week"
      ? "This week"
      : viewMode === "month"
      ? "Month"
      : "Custom"}

    <Box
      transform={viewMenuOpen ? "rotate(180deg)" : "rotate(0deg)"}
      transition="transform 0.2s ease"
    >
      <FiChevronDown />
    </Box>
  </Button>

  {viewMenuOpen && (
    <Box
      position="absolute"
      top="calc(100% + 10px)"
      right="0"
      minW="180px"
      bg="white"
      border="1px solid"
      borderColor="#D9E5F2"
      borderRadius="14px"
      boxShadow="0px 10px 25px rgba(15, 23, 42, 0.08)"
      py="8px"
      zIndex={9999}
    >
      <Flex
        px="14px"
        py="10px"
        cursor="pointer"
        _hover={{ bg: "#F8FAFC" }}
        onClick={() => {
          setViewMode("day");
          setViewMenuOpen(false);
        }}
      >
        <Text fontSize="14px" color="#0F172A">
          This day
        </Text>
      </Flex>

      <Flex
        px="14px"
        py="10px"
        cursor="pointer"
        _hover={{ bg: "#F8FAFC" }}
        onClick={() => {
          setViewMode("week");
          setViewMenuOpen(false);
        }}
      >
        <Text fontSize="14px" color="#0F172A">
          This week
        </Text>
      </Flex>

      <Flex
        px="14px"
        py="10px"
        cursor="pointer"
        _hover={{ bg: "#F8FAFC" }}
        onClick={() => {
          setViewMode("month");
          setViewMenuOpen(false);
        }}
      >
        <Text fontSize="14px" color="#0F172A">
          Month
        </Text>
      </Flex>

      <Flex
        px="14px"
        py="10px"
        cursor="pointer"
        _hover={{ bg: "#F8FAFC" }}
        onClick={() => {
          setViewMode("custom");
          setViewMenuOpen(false);
        }}
      >
        <Text fontSize="14px" color="#0F172A">
          Custom +
        </Text>
      </Flex>
    </Box>
  )}
</Box>


            <Button variant="outline" borderColor="#D9E5F2" borderRadius="10px">
              Publish all
            </Button>

            <Button variant="outline" borderColor="#D9E5F2" borderRadius="10px">
              + Lock shift
            </Button>
          </HStack>
        </Flex>
      </Box>

      <Box mx="30px" mt="14px">
        <CalendarGrid date={isoDate} activeTab={tab} viewMode={viewMode} />
      </Box>
    </Box>
  );
}
