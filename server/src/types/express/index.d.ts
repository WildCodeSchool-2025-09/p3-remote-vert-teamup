// to make the file a module and avoid the TypeScript error
declare global {
  namespace Express {
    export interface Request {
      /* ************************************************************************* */
      // Add your custom properties here, for example:
      //
      // user?: { ... }
      /* ************************************************************************* */
    }
  }
}

type Activity = {
  id: number;
  address: string;
  city: string;
  zip_code: string;
  description: string;
  playing_at: string;
  playing_time: string;
  playing_duration: number;
  nb_spots: number;
  auto_validation: boolean;
  price: string;
  visibility: boolean;
  level: string;
  disabled: boolean;
  locker: boolean;
  shower: boolean;
  air_conditioning: boolean;
  toilet: boolean;
  user_id: number;
  sport_id: number;
  username: string;
  user_picture: string;
  name: string;
  nb_participant: number;
};

type Filters = {
  sport: string;
  city: string;
  playingAt: string;
  locker: boolean;
  shower: boolean;
  toilet: boolean;
  air_conditioning: boolean;
  level: string | null;
  price: number | null;
  disabled: boolean;
};

type ActivityForm = {
  description?: string;
  address: string;
  city: string;
  zip_code: string;
  playing_at: string;
  playing_time: string;
  playing_duration: number;
  nb_spots: number;
  auto_validation: boolean;
  price?: number;
  visibility: boolean;
  level?: "beginner" | "amateur" | "advanced" | "all";
  disabled?: boolean;
  locker?: boolean;
  shower?: boolean;
  air_conditioning?: boolean;
  toilet?: boolean;
  user_id: number;
  sport_id: number;
};

type Sport = {
  id: number;
  name: string;
};
