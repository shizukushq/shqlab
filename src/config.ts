import { type PreinitializedWritableAtom } from 'nanostores';

export type ConfigItem =
	| {
			id: string;
			name: string;
			type: 'switch';
			value: PreinitializedWritableAtom<boolean>;
	  }
	| {
			id: string;
			name: string;
			type: 'slider';
			value: PreinitializedWritableAtom<number>;
			min?: number;
			max?: number;
			step?: number;
	  }
	| {
			id: string;
			name: string;
			type: 'text';
			value: PreinitializedWritableAtom<string>;
	  };

// configure this
const config: ConfigItem[] = [];

export default config;
