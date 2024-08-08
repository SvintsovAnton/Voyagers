import { CreateEventDto } from "./types"

export const fetchCreateEvent = async (eventDto: CreateEventDto) => {
  const res = await fetch("/api/events", {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventDto),
  })
  return res.json()
}

export async function fetchEventById(id: string): Promise<CreateEventDto> {
  const res = await fetch(`/api/events/${id}`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch event");
  }

  return res.json();
}
