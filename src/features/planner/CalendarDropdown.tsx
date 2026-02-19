import { Box, Flex, Text } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

 function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}



export function CalendarDropdown({
  selectedDate,
  onChange,
}: {
  selectedDate: Date;
  onChange: (date: Date) => void;
}) {
  const [viewDate, setViewDate] = useState(() => startOfMonth(selectedDate));

  const monthLabel = useMemo(() => {
    return viewDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }, [viewDate]);

  const days = useMemo(() => {
    const first = startOfMonth(viewDate);
    const last = endOfMonth(viewDate);

    const startWeekday = (first.getDay() + 6) % 7; // monday = 0
    const totalDays = last.getDate();

    const cells: Array<{ date: Date; inMonth: boolean }> = [];

    for (let i = 0; i < startWeekday; i++) {
      const d = new Date(first);
      d.setDate(d.getDate() - (startWeekday - i));
      cells.push({ date: d, inMonth: false });
    }

    for (let day = 1; day <= totalDays; day++) {
      cells.push({
        date: new Date(viewDate.getFullYear(), viewDate.getMonth(), day),
        inMonth: true,
      });
    }

    while (cells.length % 7 !== 0) {
      const lastCell = cells[cells.length - 1].date;
      const next = new Date(lastCell);
      next.setDate(next.getDate() + 1);
      cells.push({ date: next, inMonth: false });
    }

    return cells;
  }, [viewDate]);

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <Box
      position="absolute"
      top="calc(100% + 10px)"
      left="0"
      w="320px"
      bg="white"
      border="1px solid"
      borderColor="#D9E5F2"
      borderRadius="14px"
      boxShadow="0px 10px 25px rgba(15, 23, 42, 0.08)"
      p="14px"
      zIndex={9999}
    >
      <Flex align="center" justify="space-between" mb="12px">
        <Text fontSize="14px" fontWeight={700} color="#0F172A">
          {monthLabel}
        </Text>

        <Flex gap="6px">
          <Box
            w="34px"
            h="34px"
            borderRadius="10px"
            border="1px solid"
            borderColor="#E2E8F0"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            _hover={{ bg: "#F8FAFC" }}
            onClick={() => setViewDate((d) => addMonths(d, -1))}
          >
            <FiChevronLeft />
          </Box>

          <Box
            w="34px"
            h="34px"
            borderRadius="10px"
            border="1px solid"
            borderColor="#E2E8F0"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            _hover={{ bg: "#F8FAFC" }}
            onClick={() => setViewDate((d) => addMonths(d, 1))}
          >
            <FiChevronRight />
          </Box>
        </Flex>
      </Flex>

      <Flex mb="10px">
        {weekDays.map((d) => (
          <Box key={d} w="calc(100% / 7)" textAlign="center">
            <Text fontSize="12px" fontWeight={600} color="#64748B">
              {d}
            </Text>
          </Box>
        ))}
      </Flex>

      <Flex wrap="wrap">
        {days.map(({ date, inMonth }, idx) => {
          const active = isSameDay(date, selectedDate);
          const today = isSameDay(date, new Date());

          return (
            <Box
              key={`${date.toISOString()}-${idx}`}
              w="calc(100% / 7)"
              p="4px"
            >
              <Flex
                h="38px"
                borderRadius="10px"
                align="center"
                justify="center"
                cursor="pointer"
                bg={active ? "#4F46E5" : "transparent"}
                _hover={{ bg: active ? "#4F46E5" : "#F8FAFC" }}
                onClick={() => onChange(date)}
              >
                <Text
                  fontSize="13px"
                  fontWeight={active ? 700 : 600}
                  color={
                    active
                      ? "white"
                      : inMonth
                      ? "#0F172A"
                      : "#CBD5E1"
                  }
                  textDecoration={today && !active ? "underline" : "none"}
                >
                  {date.getDate()}
                </Text>
              </Flex>
            </Box>
          );
        })}
      </Flex>

      <Flex mt="12px" gap="10px">
        <Flex
          flex="1"
          h="38px"
          borderRadius="10px"
          border="1px solid"
          borderColor="#E2E8F0"
          align="center"
          justify="center"
          cursor="pointer"
          _hover={{ bg: "#F8FAFC" }}
          onClick={() => onChange(new Date())}
        >
          <Text fontSize="13px" fontWeight={600} color="#0F172A">
            Today
          </Text>
        </Flex>

        <Flex
          flex="1"
          h="38px"
          borderRadius="10px"
          bg="#F1F5F9"
          border="1px solid"
          borderColor="#E2E8F0"
          align="center"
          justify="center"
          cursor="pointer"
          _hover={{ bg: "#E2E8F0" }}
          onClick={() => onChange(new Date("2025-09-08"))}
        >
          <Text fontSize="13px" fontWeight={600} color="#0F172A">
            Reset
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
