export interface Spell {
  index: string,
  name: string,
  url: string
}
export interface SpellInfo{
	_id: string,
	index: string,
	name: string,
	desc: string[],
	higher_level: string[],
	range: string,
	components: string[],
	material: string
	ritual: boolean,
	duration: string,
	concentration: boolean,
	casting_time: string,
	level: number,
	attack_type: string,
  damage: {
    damage_type: any,
    damage_at_slot_level: any

    ,
  },
	school: {
    index:string
    name:string
    url:string
  },
	classes: any,
	subclasses: any,
	url: string
  displayModal?: boolean
}

export interface SpellResponse{
  count:number
  results:Spell[]
}
