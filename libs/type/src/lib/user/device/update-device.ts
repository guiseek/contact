import {CreateDevice} from './create-device'

export type UpdateDevice = Partial<CreateDevice> & {id: number}
