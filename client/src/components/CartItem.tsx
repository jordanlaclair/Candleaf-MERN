import React from "react";
import styled from "styled-components";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../store/actions/index";
import { State } from "../store/reducers";
type PropTypes = {
	productName: string;
	productId: string;
	totalPrice: number;
	productQuantity: number;
	price: number;
};
interface ProductSchema {
	productName: string;
	price: number;
	productId: string;
}

const CartItem: FC<PropTypes> = ({
	productName,
	productId,
	totalPrice,
	productQuantity,
	price,
}) => {
	const dispatch = useDispatch();
	const user = useSelector((state: State) => state.user);
	const handleAddToCart = (
		productName: string,
		price: number,
		productId: string
	) => {
		let order: ProductSchema = {
			productName,
			price,
			productId,
		};

		dispatch(action.addToCart(user._id, order));
	};

	return (
		<Wrapper>
			<SectionWrapper>
				<SectionProductTitle>Product</SectionProductTitle>
				<SectionImageWrapper>
					<ImageWrapper>
						<img
							src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP8AAACxCAMAAAA8hJvkAAAC/VBMVEUAAADGtb6xsK7x7ezHwcDZ1NSJdYC5pKydgI2gi5OhlpjRxsrh2dvizdajm5uzqKvc19fKusG4qa/t4uaqn6Kdj5PBtbnq4uTEvr7GsryunaTbxc6fmpewn6TMusC3sbHk4uHd1da2rK+bh5KUeYTk29/gxtKvnqPOvMOiiJbo3+KulqDi3d3eyNG4rrK4rq/z8vHz8/Px8fHowdP19PTpw9XlvtD35+/qxdf46fH03ejy2uX25u7mwNLz2+bw2OTjvc/gucvlwdPjwNLrx9jlxdf25O3y3ef29vbiu83x2eT14evjwtPlyNjhwND03+ru1+Llw9Xgu8324+zgvs/gt8n8+vr18/Pt0t/ku87jxNTw7+/y3+nnv9Lry9nnydnz8fD04+tkZWb+/Pzw3Obnx9jhwtLt1eHny9riucvq6urlv9LsyNnds8Xq0N3tzdvnxNXat8f03Ofc3Nvpzdvnw9Ph4uLu0N3dusz39PTe39/ct8nSsMHs0N3Aoa++lafs7OvHnK/u7e3ftcfJnrH59vbm5ubk4+PkzdfSrb7LqrrDpLP//v7gy9XLoLOtk5/dvs3XscPTp7rq6OfT1tbZtMXHqLf47PLY1dTlvc/bsMLOpLfiyNTFmqy5m6q0jqDw1OHYq727u7rv0t/tydrdx9G5kqTb2thOR0jh397P0M/BmKmujJxoaWr39/jX2dmxjZ7w6uvT0dHYxM7Lrr6tfpTNzM3j0dnLusPIxMKvl6Omd4zz7e+nj5qZg42ZdYhcUlX18vHp3+Po1t3QwMjKtb+zmKR2aG3j19zVwMvQu8bCsrq1tbS6k6eznqahmZ6jjZeTf4hzR1rQycrWtcWfiJL58PTXzNHKx8ezpa3t5Ojm0Nrbu8q5q7KroKe2m6eLeYGRan3Bv7+lpqa4iJ+zg5qWjpOBgYKDcnllXF9sP1Hd1NfBxsW9rrarhpuhf5IyMC++prKfbYJAOTqGX3J+UmeUlph9en11dXdvW2Srra1aO0mKiIyMcYO7hpwEI3aoAAAAMHRSTlMA/RAfHTcemWZFmn1em35lS8TAv72EcmMu5d++sq+f8+Hb2tSKfOTQtq+o8NrQoEgHUYlmAAAXRUlEQVR42uzBgQAAAACAoP2pF6kCAAAAAIDZL2PWtoEojpvECU0Cdhpi4yHBJEuXkujEfQiNnazhlgN30mowOJMQyOqQTFo0ezHO4CIPMQIvdhYPgQ6CNnh0oEu/Qab+3+mCQ9dOF/KTdbo7efm99+4kvfPOO/9BudzYq1Yqldr+/v7p6QmBXq1Sq3zY2yvvlt4qu5fVysnxeXOQ3U2Go9j3fZsxy5a2BZj0vdH3ZJKvH86PjmvVyzcVh0b14qiZPU66glQtIKRrucRcomGua2HImUZcJXfZx4vqTsl8GvXjZpb0LZdz3uPQhCuce2iRebRoEJI5zeNggILEuMP6k8FRvVEymK36p+d1ZLEw5GEIQYi5ShmtQDGgK6ggGEUDLSd/XQbc4Y7j3a7P6+WSmWwdNLOu7HGGdFKNM9uWcIYoxLHwbXRFIGloA+sl95wznNwBzPei2+xgq2Qg22d5rNY3+VjMtlzSVAGQQtiCBnYQYKbwV4lX24OyJ8bw9/x4eGZiCXzu+K4LZ0klDUvGbO1P6H7gi5cJ/E1HQKdf+weBNzozrwIO8whqQlK9cyjhCjb6gpRtAX89WxQ+WjoB9B0WKP8oN+9RcJglqZRSuALi5M7Isjh0ADArsABsiVukT/4aTozH2j9ZH5ZMY6eTTQJBC13LA/SY/cpe+xdRUc6kru2pAnjge4GfD4bm5X+nM1gPcp/0CntdANQoii0hwF19mxNss/0DLvw4+/EwSczz3+7k0XDw9HTbZ4D2/4LNCoA4o+oodn1IKzbJB37+/HuQdDrJdsk0tjtZLGTIo0nS7cZ6DeitgJSVMR4PyhcRKJJOF4JSHw0fs0nX87pXRvqPsljKsH193W61ZvEq6kf9QCLbyl7lWb3gpFAlHBpy+giQgR9Hi4Un2HjMbS821r8vyJ9ot9ut3my1WC7SdLVKZ5K+f0h67qYOx+IQIk0Xy+Vy9OfXzXR5v5pRNMbKv9/tDM30j4Tsaf+CFgjH4c/Z6uuXezCdfltOqXMzXazSdIa4CP0q5BQBcAr/oYH+0eOI/FUAtP6GsFcwl7Hb69F3sCXxI32h/JU++fv9EfzNewEua/9N/lv/+IcA/iH1XWm5EtivAqD9kf/EQP+/1JdNbxJRFIaJexfGpYmpO2N0RQawMHx1ygQ6DrSKItLBJjNQkgHGMmNjGvzCD4ypqTQRBDTUQprqqjbRmHRDdaGJrjRorP/AP+F7BqImxh8wz9zesOjmec+9Z87su/utZNb/P/6A/C/AnxKgz/9z0L9AC10S/mBY/43GhvXm/31332xswf9fe9LvX+n3+ztbO+h6Wzv9/rmdi9QT6QCQP00FwwDgvwr/kvX8bXc/bmztoP7ESP/KYFDfmptLpeS3oqglk4GZves9v9jOtMUZUcy0l6vL7zd3v19HAqN5gAZAtP9Nm/XYhP9F8scAgPM+qHtSqRQv86nxcZ7PShwnAXm1VzTBb2yKdko5lWzjDbj7/aaZANXfmv6ljyWz/mdvD+p1j8dzem4KRKei0eg4/AGM5dXXi4vr64vEOiiXEyaFQmIPGVyg+afUaJRs1qP0bHN1dfc27IHTEyL/VAryWAsJiZOI2J3XRaiP/DsURCLR6cR8QOZleRcj02bj5YbNeow9a/z88HowIP+TztDp01MpME54vYucy8VxqpSFPwWArWgehNEBiJE+j/+PVbdfvno+ZrMeYx/fvOvtjfSp/FF+nAe0ucuaYWhIoHD5p0q3Hw/8QbGsFxBBFgFEZESQ3atuv/t83GY9xp59Xu5V6wPon8Tln4umeB5GXn6B9/rKRpA1DNbRLv00GEmlXmAiAf13ArIsJ6rt3ofPR2zWY+zrdu+HWAfkP9R3e92yG0TKrMPh8PtzYuOrw2HgImAhAhVdIY0IkAACoAQKk5neds+K/scL1faPlZOwdzpDKD9VH+ZkH4kV2cd+P2uw+Xt+u8FxnMYo2FXOpWiKkk7P64UCAgDzQiaTqZ6wWY+De7qktE+i/ORPr/5IJOLDAjEpHA+HzzvOV9bidsNgDED9wMUYGpHWdR0BIAF9WptYEQ/ZrMfB6ilFKg/rP0f+0KaHSCjxfL4Sr+TytXzOwbJ+P7agYTgcE36/IExMK+n5ArUANxpF4OEla/on4e+EP9o/jr9M6lmA3lYWms1mnlarmYsHwuFAIJzLseFwLuyfOSMKwuQp1D/mi/h0f+DhvS+W9G8nFaXohD4OgOf01DAB6IOyuDak9qDWzFea+Xy8UsnnAvF4YCYgClq6vLjeAbFYemmp1rp3wGY9DrbFaY1zkr0T4y8NQFOY/LzuSCybMJprzTUs8kcAuAuBwHmWnZ11qRIGgTKRANnp/MPWjUeW9ZecZvlJn/xp9ie8vmLXhOO6KqeqKn6qHKF28R7E0kcJiGu1W0+s6p8Mpkf+oT/2CwuYfzuYdbpqV1WxwZ8Wh5HYxbg4+jIYjUGA/F/cP2qzHsfaZ4RpxfQfnX7SNwNYgD/cuS5HkDrZM4yLsWuK5lKUkT6YqbWeXLtqTf+ViaDigT7VP2TefrP+XvSAThf+UKevIAYbFmMnDA0DkGs4A1EES61bNyzrLwga+ZN+yPz0hz11QLe3Q9fdpUKcYOiPsTN21m5ntCAiQABKWi/o80u1Gy+uPT1ssx7HlldEYZL8PXj9me2P9HH48QqA//DKj8zNsz87yzrsQY2OwCSe9DxYaj148smS/vuXV4SJyRDuv+fv+0/+v6g3v9amwSiMK+KV3usX8N4YEic1dSYGWU2G0V7YaSgG/0wj6sSqoKiDXViHdhtuUPyLwxmmAVGZUlwJKouyYTfYcOjcBoOtvRAmBVfBC5/zphd+hfdsXXf7e5/znPec0zSe6D8DdvqhkFgooFdkV4H8KiUA8Z8+33a3/drAHJf8T7qMFvJ/3f7Y/kT2R/4nLp6qo4sRO5zvAt9OyWpGtTK6blECpM+ne3s6eOWH/sj/qP4zfsKP7J94dOoUuZ7YRYSNIchWFFfOu6p61sJL11EBUQK773Y8eziybhV/selW1zHD2v+f/pH8ZP9EP8lPno8CaYDmT8ROwFVdFWEhAUxMgWnwXxvgll87e5jJv/3rj9nVb5j/4/FzscSOflQ/lgBAp7AVUc4rcj4vuxrhWzrVv3Srie732UCBT/6ZZs04xMbfku/UfL/0AfpH/j9A/pdY5bfZCSi0EFLkFPhdyv8WGOA86n831b8cj/wb6P6zDhP/rO/7vxccv/aGpX8c9Y/w6QBY8ttR8udpJaLKLP+Bb5pp8N+G/59zyn9M0/cD/5PvO87jOziAleNMfvATfsQv2TaOgHYfTalUo6ypGuV/l6XT/W+C/9rD3PpV/AX4DY3Vv58O4sKQsOQ4i6z7iSX60fpR18fsT3+wC7YbcQCyqmmaar0OWugCqNc/Tvnhf2sP+EvAL10YEwZhg49R/X9E+U/4UgYJIIJfzGfb8im50UX9184WJyyd8t/M3m7nVf8bM0lD3b1t67a/4H8qDAkHfccv4f6/VVpZnNnF/N/ALn+4/0q1OxhPNTXJrjsyPlHwKgbuPzggC/9zyo/618Lq/yL4Twovp8kANchfW/qxUmlsuNKZ7JUmpZuuKF5+cHV5p5frDb3wcjEoe7n5Ai7AVvDzrH9Xs6aR/rPgHxLGTm7x8U88/tl5kzj9YLJY9QKvYTmoVrPZqucRfzm8WZkKOo1Kbj4H+5uIbDuv9W895b8F/q2jwF66jhPAux+Pv/JjO9D/eVNS2ZOWx2VvKvyT6ST+ihdUCl6fFUB/DEAoAGYW9e8Fp/zU/+5G/3/EQdQWFhzGH9vrv008Gd5XnZOGPXG5TwqKlbLUR/x/yt1hZxhUvMJ4n66j+rWaPUx//h7/xgPwqP/NBvSnArCwAO9TLKL+jzorlTATBkUP+t8Ug+JUdT4A/8jVwJvQ2nK/kqpBDTCr/x3Qn0/+G21JDfqzBmhIODk9OIYzWE3j363R0YaGSxPhcFkKr0jFB/ZUODeuXO3NU/1XVdz/mpVGA9hav/8KPPKvhf817Qjb//0cFIRpQRhyFjH/4AQw/2L0wa8Yjb/0ov4/lQI/QsP8lzaJvwf8L+b4e/yd+NuaDfUI8DEAf2PPew8ufcf4lwB//y66/UUKLD9sbL5o9mmST2D+of7XsCB/mukP/4/wyT+Z1NQd8D/tP7a/27z53XuMv7Go/4umX8ieYfpTyEo+3ySzBLCgP9V/U+8h/4/w+C3Ijd+R/1Zdf7b+PlTff0T617dfNqNXRAz/jbK8E/iuRvIfZQa4l719f+Ahl/xrqP6psfrHXziAaP0NfNI/2vtGgXfgRw5wXZgfCQD5YQD4v6P92Ysv/D3+iwegb1xKGqz+sf3fYax/D7H1d4ztPyj9KWj8URD/uDvTHxfCOI6XF84gEbwgeOGOIK7GbWpclSrGVLZFhFBKiHFl0o5xBp1m15a2cW0rS1esJjZaq1ZWCUXLsusIjfu+ifsW39+0jn9hfLPphuybz/P9Pb/n/D3dir1PvTr/Z0GP4W/CWEwBbTj+qNIqv4ANUPT/P6e/A6YMGAJ+2I/4V4+7qO9jAwgJUE8dwGo15jYAbTT8YwEE/4vgvwav/+pqbxDsrGm8ev6J8D95dnbu9Av2Ez/hk/9Erw5/W/XgZxjC52n+QxMA+I/xX5P8Osr/ptnAJ/9H3hwfz78VTt08OZTifxfin9hzwz/Gv6l6ZutWq0uUKjyVwcsmwkcCBH/RirLzOi1qg8Cx7FDip/w/MxO+9ShzMn79ViZ+/kLh7lOVgcqNSlDpLYmxqYGpcs0V/51KfMqxK7cr1ARA0x/bpoKiFRGt8vMm2+zf+a/WhfDj1IXwhWQmkx9O5vWr5voGgrHbT/rWHL3iPi3Ld2q8T6oDNUdvH62WZNMwEw6A0P/tyP8a9t88LO+f84/8AZnwhXhmwcBwcle/y1feBGSp5o705I58p6LGCPOPbpWD1RulU4JkmkAJAPMf+3bt8u9w8eZhy9X5j3r7JXv8MTS/VnRDNK/fqaOSR5bkjTWBU/Jp/enBd6rdRzcqXoZlmQks8asnYODXbPzvcKGoIw/T39zld8z/RqnHf7gDiflvLvUZaANcj9MPK8Y/o3EegwMQ8zAbEiD5z+P4T7P8Am82L8hd/5ie9X/IKPCHX6ZvXq4QA56poiT17u2mw6/B1oAV/A49QxMgFvzAp/hfVVSi0fgP+11mU44f8U/+k/3Q2Ze1Kj23K2VOqrmtnKoISlc8lZVBIxrAgeGfYbILIGoBcwH8L+uq06I6CqLZtCS7/Pm7/iH/b0bPxip7e4JB6VRNdfXG4MaNTGXQY7VudRhp/WseZjKZaAS0If5XrVoR0Sg//GcXAD9X/EPpD+EPof9nj/8Q9xwzGNLT6ZeeMVg4FuFvZtEAoIf/iP8VkZY6LQr+E3//3PJPrXsapS7/sP7ZDXikP8z9B0+l/Ed7P4zVaMAKkEUE2NkJthFjR4zlC6j/a5ffvODv8I/wP5G6Dnwob3j2upe+L116gubp0fkdVgd3mWUY1sRS/EOFBav2adX/bn6R55f85sf6FxUg+QvS0fCY/CWF5r56RurtpqNvPeKfcQket7Jme0CWgY99YxNrG2GD/3T9oayTTovqJrg4fklu+kPFb6MGDFgwOz96fUz0+g6zwMmB3oGAX2IUWZH8ktWjuN3+gOJnGV713wbtECn/R7TJ30oQeHZOLv1T/dMAdfOXSkDy5hQqglsYfFkRDXrZoEhug9Xv969xcIh+3pxrAPgvYvlTEmmm06KInxsL/mz8j0P8D6Hqp/DQMTt39BNFdP+plPoZ3PpjthodBq/DYeF4jmcYHByaVP+F7UX7NMvvF8z8rEGET/Nf1D5mK6A2JJOp5ELJLUmDXYIUc0mMSwm4/bJHNqAKwMBwiADWlONfq13+zoKf40eA/+/0fxRl/wWpDenULA7MekXyBN0evd/rUVwK/gPlHxwPfCRAGzWA/UZBEfp/a50W1UjAAGAjfvJ/yjgq/sbYP3Qopj95/bDyGTw4oHcxArOVcfkNDgfKX9ZYOGoBnmcRATa73SZQ/9csvyBy4M/t/qIAcBHifwyVv+3Mw31HbHnNw4Yng+IvLHysBovDsQb0EPh54reBf9W+qkhdnRbVyO8F/0jq/3/KX2G+2gB5C8GPkZ+hLU98oAEsDovFsibrvxk/dthvh//a5fd6XZxt4qCc/1QBSdFPZXA7ly/Vo+4Vsz6wM0bUvqEEDvE/HwmQEzlO5O2s3QZdXltUVPJKo/yXvS7RNJK6P+wnfkx8s/yzqf53HgN+mE/4VofBYYHmcwgAAxIAZ7bbUPrqXQX+kDb523jdLpd5YpafCkBV/yHyfyH4cdnPSGJgv9VoUfkpASACCnPx71+l3f7fpmCTX2Cn4/ADuz9kP/V/iGoglw8Dv34enfmAnzEg+aP4EXWALoOaAICvNoAX67+qSAOdFlU3VOB1madT71fTH/iz4T8U8b8QSR/+6/WofFVF6W/+NvivRgASoJ3khf+ho+11WlTdu0cK/OJ02vxA+lMbYIxaAE0BsBC9nxmMvS6U/GLSl7UfhbAixyP/4RP+Y/7jRfXP6y8a5X//LFHknY7OT/aDH+FPAn/eApWfYY0OhiN+i0Plnz/fYMjiYw5I/V/aV5X4cqyxTovqEPn27H3ZTBUfs3+Kf6S/rP2Ifyvd9kbgw3yLwaL2fsjlMogGUeSzE4BC5eD7i98eddBpUQ2fP/n27mJ4/MwpJMIn83P8S/VWDH0U/UaCN64BPsW/AQEAFfJ8IS9eVl5/+HbsZi8tXv/X6Vo8v/Dp6Zd4NP/Q7JmqcmM/8JH/rVZ15CPjs/aT/9vgP0l0YWWoyJHX779Un+uzuoVOi2qRuv/480fn3qsn4+nohgWziVyFx88SlqNOz1go7znAbplP+KiFny/4/V5JWVWW+HE0c6n0RfGLSVeb6LSoHp5b3z99XIYHHOcuLr926WS0cMfYOdmy5iXTOCCvMTCU9IhcZcdzAFDBqgehiopHt/B9AcuW+V4Ulx/fWF+nSXV99f0x8a/HG177fT7fgasn05IkCYVIbXj6Ae8fzFffgAD29k0FOOj8eeTg62Cm1oH9L4rP3Vu236nyb3nTTqdNNUkkTs9YvHndurmbncS/f/9i57J1zqvPo/GYHHp48MiRI28h/DpYEoycelPrXjn+Bn/lA/+L9eB3lhZnTiW0Gf5Ql8SPH1uWrV+HN3wXA2ux07l5Pf0LX/4xd6X6yiU0Gm+8zV23bt36ZcsWo418UGkx+J34c19xxevX3XVaVe0uiUT0zF7nsvVO5/79AFo/GTG9bvNcaPVqPPKIhx574mMu0TudwAc7dO/r1/vF5aUHyuNVr1410+Tlp5yaX0mfOHPo0JnnWw6U+kp9i+fCVAQEegQ1weTVK1euXr16pYqPLlJaXl5aWn7txdePHy/crHU2FotVndfm2u+P6reMH8rPj0ZT6fRJ6OqBLQd8lAac0HqiVo3fs993oPza4eLi4nv3Xt4M3g5WVQWDHiV2tqVGU/8/qtfybDSVQuKPQUpAUWKxZDqVDCge/I7H0+lk/Gyy1tmXb+RgKFRSUhIKhV5BZVWeeNvGWo79vy3Q7k2tZDIW8MiQJ6uHSPoHD2IQePjwQU4PHx6EjiTu3r2beL0x87JpPd3/ojrt21XfugmHS8oiZWWhkqoSjHxogQdE/BDgNBLeff/h4ocPH97ffV1x61a75v/VV0D9apeOURCGwSiOk0XTbi04ZOhSC9JLegU3Rz2FEJSapV0sOAgSHLxApIpgJxcjOngAp/D/Dd83v8fzFchyvD6LupkvltfVpndP51x/+HDe+z9MdWq7PJaBhf8aREU5uWt7sbbZVzdj/NY9sz3Opp2ud7rNh6MozOy/LUhZZGmaKKWEEP4mSZrFUgafHAAAAAAAAAAAAAAAAAAA4D9eUaKqBGXYNRcAAAAASUVORK5CYII="
							alt=""
						/>
					</ImageWrapper>
					<SectionTitleRemove>
						<h3>{productName}</h3>
						<h4>Remove</h4>
					</SectionTitleRemove>
				</SectionImageWrapper>
			</SectionWrapper>
			<SectionWrapper>
				<SectionTitle>Price</SectionTitle>
				<SectionPrice>${price}</SectionPrice>
			</SectionWrapper>
			<SectionWrapper>
				<SectionTitle>Quantity</SectionTitle>
				<QuantityWrapper>
					<IndeterminateCheckBoxIcon />
					<h3>{productQuantity}</h3>
					<AddBoxIcon
						onClick={() => {
							handleAddToCart(productName, price, productId);
						}}
					/>
				</QuantityWrapper>
			</SectionWrapper>
			<SectionWrapper>
				<SectionTitle>Total</SectionTitle>
				<SectionTotalPrice>
					${Math.round(totalPrice * 100) / 100}
				</SectionTotalPrice>
			</SectionWrapper>
		</Wrapper>
	);
};

export default CartItem;

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: flex-start;

	border-top: solid 1px ${(props) => props.theme.colors.opposite};
`;

const SectionWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	padding: 40px;
	min-width: 250px;
`;

const SectionTitle = styled.h3`
	margin-bottom: 20px;
`;
const SectionProductTitle = styled.h3`
	text-align: start;

	align-self: flex-start;
	margin-left: 20px;
	margin-bottom: 20px;
`;

const SectionPrice = styled.h3`
	font-weight: bold;
`;
const SectionTotalPrice = styled.h3`
	font-weight: bold;
`;
const SectionImageWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
const QuantityWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	.MuiSvgIcon-root {
		cursor: pointer;
		padding: 0px 5px;
	}
`;
const ImageWrapper = styled.div`
	justify-self: flex-start;
	width: 80px;

	> img {
		width: 100%;
		height: auto;
	}
`;

const SectionTitleRemove = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	> h4 {
		text-decoration: underline;
		cursor: pointer;
		color: ${(props) => props.theme.brand};
	}
`;
