export type Meetup = {
  id: string;
  titleKey: string;
  visibilityKey: string;
  whenKey: string;
  paceKey: string;
  attendees: string;
  noteKey: string;
  coordinates: [number, number];
};

export const featuredMeetup: Meetup = {
  id: "south-park-ride",
  titleKey: "southParkRide",
  visibilityKey: "unlistedLink",
  whenKey: "todayAt1930",
  paceKey: "steadySocial",
  attendees: "8/12",
  noteKey: "meetupNote",
  coordinates: [23.3187, 42.6845]
};
