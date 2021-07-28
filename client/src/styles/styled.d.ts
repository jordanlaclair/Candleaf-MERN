// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
	export interface DefaultTheme {
		colors: {
			primary: string;
			secondary: string;
		};
		text: string;

		toggleBorder: string;

		hover: string;
		accent: string;
	}
}
