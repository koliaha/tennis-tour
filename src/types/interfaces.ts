export interface RawPlayer {
  tm_id: string;
  freeze_stage?: string;
  check_public?: string;
  stage_type?: string;
  player_id: string;
  name: string;
  name_tour: string;
  gender: string;
  rtt_number: string;
  birth_date: string;
  doc_city: string;
  pay_member?: string;
  join_date?: string;
  comment?: string;
  stage: string;
}

export interface Player {
  tm_id: string;
  player_id: string;
  name: string;
  name_tour: string;
  gender: string;
  rtt_number: string;
  birth_date: string;
  doc_city: string;
  pay_member: string;
  join_date: string;
  comment: string;
  stage: string;
}
