export type Client = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: Date;
  tags?: string[];
  activityHistory?: Activity[];
};

export type Activity = {
  date: Date;
  description: string;
};
