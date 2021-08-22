const size = {
	mobileXS: "320px",
	mobileS: "350px",
	mobileM: "375px",
	mobileL: "425px",
	mobileXL: "560px",
	tablet: "768px",
	laptop: "1024px",
	laptopM: "1300px",
	laptopL: "1440px",
	mediumDesktop: "1744px",
	desktop: "2560px",
};

export default {
	mobileXS: `(max-width: ${size.mobileXS})`,
	mobileS: `(max-width: ${size.mobileS})`,
	mobileM: `(max-width: ${size.mobileM})`,
	mobileL: `(max-width: ${size.mobileL})`,
	mobileXL: `(max-width: ${size.mobileXL})`,
	tablet: `(max-width: ${size.tablet})`,
	laptop: `(max-width: ${size.laptop})`,
	laptopM: `(max-width: ${size.laptopM})`,
	laptopL: `(max-width: ${size.laptopL})`,
	desktopM: `(max-width: ${size.mediumDesktop})`,
	desktop: `(max-width: ${size.desktop})`,
};
