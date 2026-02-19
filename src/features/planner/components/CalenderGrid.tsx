"use client";

import { Box, Flex, Grid, Text, Portal, VStack } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { FiX } from "react-icons/fi";

type Room = {
  id: string;
  name: string;
};

type Shift = {
  id: string;
  roomId: string;
  title: string;
  staffName: string;
  initials: string;
  start: string;
  end: string;
  borderColor: string;
  bgColor: string;
  nameColor: string;
};

const rooms: Room[] = [
  { id: "days", name: "Days" },
  { id: "room1", name: "Treatment Room 1" },
  { id: "management", name: "Management" },
  { id: "special", name: "Notes / Leave / Training" },
  { id: "finance", name: "Finance" },
];

const timeSlots = ["11:00", "11:30", "12:00", "12:30", "13:00", "13:30"];

const HEADER_HEIGHT = 46;
const TIME_COL_WIDTH = 110;
const COL_WIDTH = 230;
const ROW_HEIGHT = 78;

const shifts: Shift[] = [
  {
    id: "s1",
    roomId: "room1",
    title: "Surgery",
    staffName: "Henry Carter",
    initials: "HC",
    start: "11:00",
    end: "13:00",
    borderColor: "#F97316",
    bgColor: "#FFF7ED",
    nameColor: "#F97316",
  },
  {
    id: "s2",
    roomId: "room1",
    title: "Pain Specialist",
    staffName: "Diane Lane",
    initials: "DL",
    start: "11:00",
    end: "13:30",
    borderColor: "#22C55E",
    bgColor: "#F0FDF4",
    nameColor: "#22C55E",
  },
  {
    id: "s3",
    roomId: "special",
    title: "Pain Specialist",
    staffName: "Diane Lane",
    initials: "DL",
    start: "11:30",
    end: "13:30",
    borderColor: "#D4B106",
    bgColor: "#FFFBEB",
    nameColor: "#D4B106",
  },
  {
    id: "s4",
    roomId: "management",
    title: "Pain Specialist",
    staffName: "Henry Carter",
    initials: "HC",
    start: "13:00",
    end: "13:30",
    borderColor: "#F97316",
    bgColor: "#FFF7ED",
    nameColor: "#F97316",
  },
  {
    id: "s5",
    roomId: "finance",
    title: "Pain Specialist",
    staffName: "Diane Lane",
    initials: "DL",
    start: "11:30",
    end: "13:30",
    borderColor: "#D4B106",
    bgColor: "#FFFBEB",
    nameColor: "#D4B106",
  },
  {
    id: "s6",
    roomId: "finance",
    title: "Pain Specialist",
    staffName: "Diane Lane",
    initials: "DL",
    start: "11:00",
    end: "13:30",
    borderColor: "#22C55E",
    bgColor: "#F0FDF4",
    nameColor: "#22C55E",
  },
];

function toMinutes(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function getTop(start: string) {
  const startMinutes = toMinutes(timeSlots[0]);
  return ((toMinutes(start) - startMinutes) / 30) * ROW_HEIGHT;
}

function getHeight(start: string, end: string) {
  return ((toMinutes(end) - toMinutes(start)) / 30) * ROW_HEIGHT;
}

function groupByStart(list: Shift[]) {
  const map: Record<string, Shift[]> = {};
  for (const s of list) {
    if (!map[s.start]) map[s.start] = [];
    map[s.start].push(s);
  }
  return map;
}

export function CalendarGrid() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalShifts, setModalShifts] = useState<Shift[]>([]);
  const [modalTitle, setModalTitle] = useState("Wednesday 31");

  const gridHeight = timeSlots.length * ROW_HEIGHT;

  const shiftsByRoom = useMemo(() => {
    const map: Record<string, Shift[]> = {};
    for (const r of rooms.slice(1)) map[r.id] = [];
    for (const s of shifts) map[s.roomId]?.push(s);
    return map;
  }, []);

  function openModal(payload: Shift[]) {
    setModalShifts(payload);
    setModalTitle("Wednesday 31");
    setIsModalOpen(true);
  }

  return (
    <>
      <Box
        bg="white"
        border="1px solid"
        borderColor="#D9E5F2"
        borderRadius="14px"
        overflow="hidden"
        w="full"
      >
        <Grid
          templateColumns={`${TIME_COL_WIDTH}px repeat(${rooms.length - 1}, ${COL_WIDTH}px)`}
          h={`${HEADER_HEIGHT}px`}
          bg="#F8FAFC"
          borderBottom="1px solid"
          borderColor="#E2E8F0"
        >
          <Flex
            align="center"
            justify="center"
            fontSize="13px"
            fontWeight={500}
            color="#4F46E5"
            bg="#EEF2FF"
          >
            Days
          </Flex>

          {rooms.slice(1).map((r) => (
            <Flex
              key={r.id}
              align="center"
              justify="center"
              fontSize="13px"
              fontWeight={500}
              color="#6B7280"
              borderLeft="1px solid"
              borderColor="#E2E8F0"
            >
              {r.name}
            </Flex>
          ))}
        </Grid>

        <Box position="relative" h={`${gridHeight}px`}>
          <Grid
            templateColumns={`${TIME_COL_WIDTH}px repeat(${rooms.length - 1}, ${COL_WIDTH}px)`}
            h="full"
          >
            <Box bg="white">
              {timeSlots.map((t) => (
                <Flex
                  key={t}
                  h={`${ROW_HEIGHT}px`}
                  px="18px"
                  align="flex-start"
                  pt="14px"
                  fontSize="13px"
                  color="#475569"
                  borderBottom="1px solid"
                  borderColor="#EEF2F7"
                >
                  {t}
                </Flex>
              ))}
            </Box>

            {rooms.slice(1).map((r) => (
              <Box key={r.id} position="relative" bg="white">
                {timeSlots.map((t) => (
                  <Box
                    key={`${r.id}-${t}`}
                    h={`${ROW_HEIGHT}px`}
                    borderLeft="1px solid"
                    borderBottom="1px solid"
                    borderColor="#EEF2F7"
                  />
                ))}
              </Box>
            ))}
          </Grid>

          <Box
            position="absolute"
            top="0"
            left={`${TIME_COL_WIDTH}px`}
            right="0"
            bottom="0"
          >
            {rooms.slice(1).map((room, roomIdx) => {
              const roomShifts = shiftsByRoom[room.id] || [];
              const grouped = groupByStart(roomShifts);

              return (
                <Box
                  key={room.id}
                  position="absolute"
                  top="0"
                  left={`${roomIdx * COL_WIDTH}px`}
                  w={`${COL_WIDTH}px`}
                  h="full"
                >
                  {Object.entries(grouped).map(([startTime, list]) => {
                    const first = list[0];
                    const extra = list.length - 1;

                    const top = getTop(first.start) + 8;
                    const height = getHeight(first.start, first.end) - 16;

                    return (
                      <Box key={`${room.id}-${startTime}`}>
                        <Box
                          position="absolute"
                          left="10px"
                          top={`${top}px`}
                          w={`${COL_WIDTH - 20}px`}
                          h={`${height}px`}
                          border="1.5px solid"
                          borderColor={first.borderColor}
                          bg={first.bgColor}
                          borderRadius="12px"
                          px="12px"
                          py="10px"
                          cursor="pointer"
                          onClick={() => openModal(list)}
                        >
                          <Flex align="flex-start" gap="10px">
                            <Flex
                              w="26px"
                              h="26px"
                              borderRadius="999px"
                              bg="#E2E8F0"
                              align="center"
                              justify="center"
                              fontSize="11px"
                              fontWeight={600}
                              color="#64748B"
                              flexShrink={0}
                            >
                              {first.initials}
                            </Flex>

                            <Box minW={0}>
                              <Text
                                fontSize="13px"
                                fontWeight={600}
                                color="#0F172A"
                                lineHeight="1.2"
                                noOfLines={1}
                              >
                                {first.title}
                              </Text>

                              <Text fontSize="12px" color="#475569" mt="2px">
                                {first.start} - {first.end}
                              </Text>

                              <Text
                                fontSize="12px"
                                fontWeight={500}
                                color={first.nameColor}
                                mt="2px"
                                noOfLines={1}
                              >
                                {first.staffName}
                              </Text>
                            </Box>
                          </Flex>
                        </Box>

                        {extra > 0 && (
                          <Flex
                            position="absolute"
                            top={`${top + 10}px`}
                            right="18px"
                            px="8px"
                            h="22px"
                            borderRadius="999px"
                            bg="#F1F5F9"
                            border="1px solid"
                            borderColor="#E2E8F0"
                            align="center"
                            justify="center"
                            fontSize="12px"
                            fontWeight={600}
                            color="#334155"
                            cursor="pointer"
                            onClick={() => openModal(list)}
                          >
                            +{extra}
                          </Flex>
                        )}
                      </Box>
                    );
                  })}
                </Box>
              );
            })}

            <Flex
              position="absolute"
              left={`${COL_WIDTH * 1 + 10}px`}
              top={`${ROW_HEIGHT * 2 + 12}px`}
              w={`${COL_WIDTH - 20}px`}
              h={`${ROW_HEIGHT * 1.2}px`}
              borderRadius="10px"
              bg="#F1F5F9"
              border="1px solid"
              borderColor="#E2E8F0"
              align="center"
              justify="center"
              fontSize="13px"
              fontWeight={500}
              color="#475569"
              cursor="pointer"
              onClick={() => openModal(shifts)}
            >
              See all
            </Flex>
          </Box>
        </Box>
      </Box>

      {isModalOpen && (
        <Portal>
          <Flex
            position="fixed"
            inset="0"
            bg="rgba(15, 23, 42, 0.25)"
            zIndex={9999}
            align="center"
            justify="center"
            onClick={() => setIsModalOpen(false)}
          >
            <Box
              w="520px"
              maxW="calc(100vw - 32px)"
              bg="white"
              borderRadius="16px"
              boxShadow="0px 25px 50px rgba(15, 23, 42, 0.18)"
              overflow="hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Flex
                px="18px"
                py="14px"
                align="center"
                justify="space-between"
                borderBottom="1px solid"
                borderColor="#EEF2F7"
              >
                <Text fontSize="18px" fontWeight={600} color="#0F172A">
                  {modalTitle}
                </Text>

                <Flex
                  w="36px"
                  h="36px"
                  borderRadius="10px"
                  align="center"
                  justify="center"
                  cursor="pointer"
                  _hover={{ bg: "#F1F5F9" }}
                  onClick={() => setIsModalOpen(false)}
                >
                  <FiX size={18} />
                </Flex>
              </Flex>

              <Box px="18px" py="14px" maxH="520px" overflowY="auto">
                {Object.entries(groupByStart(modalShifts)).map(
                  ([time, list]) => (
                    <Box key={time} mb="18px">
                      <Text
                        fontSize="16px"
                        fontWeight={600}
                        color="#0F172A"
                        mb="10px"
                      >
                        {time}
                      </Text>

                      <VStack gap="10px" align="stretch">
                        {list.map((s) => (
                          <Flex
                            key={s.id}
                            border="1.5px solid"
                            borderColor={s.borderColor}
                            bg={s.bgColor}
                            borderRadius="12px"
                            px="14px"
                            py="12px"
                            gap="12px"
                          >
                            <Flex
                              w="30px"
                              h="30px"
                              borderRadius="999px"
                              bg="#E2E8F0"
                              align="center"
                              justify="center"
                              fontSize="12px"
                              fontWeight={600}
                              color="#64748B"
                              flexShrink={0}
                            >
                              {s.initials}
                            </Flex>

                            <Box flex="1">
                              <Flex gap="10px" align="center" wrap="wrap">
                                <Text
                                  fontSize="14px"
                                  fontWeight={600}
                                  color="#0F172A"
                                >
                                  {s.title}
                                </Text>

                                <Text fontSize="13px" color="#475569">
                                  {s.start} - {s.end}
                                </Text>
                              </Flex>

                              <Text
                                fontSize="13px"
                                fontWeight={500}
                                color={s.nameColor}
                                mt="2px"
                              >
                                {s.staffName}
                              </Text>
                            </Box>
                          </Flex>
                        ))}
                      </VStack>
                    </Box>
                  )
                )}
              </Box>
            </Box>
          </Flex>
        </Portal>
      )}
    </>
  );
}
