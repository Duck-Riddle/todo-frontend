export interface TaskProps {
    readonly id?: string
    readonly txt: string;
    done: boolean;
    readonly timeStamp?: number;
    readonly index?: number;
  }