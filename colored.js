import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import {
	InputAdornment,
	InputLabel,
	MenuItem,
	TextField,
} from '@material-ui/core';

/**
 *
 * @param {*boolean : change the border color} isError
 * @param {*string : plaseHolder of input} placeHolder
 * @param {*string: ex : text,number,password,email...} type
 * @param {*fun: on input change} onChange
 * @param {*value of input} value
 * @param {*defaultValue of input} defaultValue
 * @returns input field with type (type)
 */
const TextInput = ({
	isError = false,
	placeHolder = 'Enter Your Text',
	type = 'text',
	iconPosition = 'start',
	icon,
	onChange = () => {},
	value,
	defaultValue,
	disabled,
	style,
	select = false,
	multiline = false,
	options = [],
	borderNone,
	...props
}) => {
	const classes = useStyles();
	const inputStyle = classNames([classes.inputContainer], {
		[classes.mainBorderColor]: !isError,
		[classes.errorBorderColor]: isError,
		[classes.disabledField]: disabled,
		[classes.borderNone]: borderNone,
	});
	const menuProps = {
		getContentAnchorEl: null,
		anchorOrigin: {
			vertical: 'bottom',
			horizontal: 'left',
		},
	};
	const ICON =
		iconPosition === 'start'
			? {
					startAdornment: (
						<InputAdornment position="start">{icon}</InputAdornment>
					),
			  }
			: {
					endAdornment: (
						<InputAdornment position="end">{icon}</InputAdornment>
					),
			  };
	return (
		<TextField
			{...props}
			className={inputStyle}
			classes={{ root: classes.root }}
			onChange={onChange}
			placeholder={placeHolder}
			type={type}
			defaultValue={defaultValue}
			disabled={disabled}
			value={value}
			select={select}
			multiline={multiline}
			MenuProps={menuProps}
			SelectProps={{
				MenuProps: {
					getContentAnchorEl: null,
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'center',
					},
					transformOrigin: {
						vertical: 'top',
						horizontal: 'center',
					},
				},
			}}
			InputProps={{
				...ICON,
				disableUnderline: true,
				className: classes.textStyle,
				style: { ...style },
			}}
		>
			{options?.map((option) => (
				<MenuItem
					key={option.value}
					value={option.value}
					style={{ backgroundColor: option.color }}
					className={classes.menuItem}
				>
					{option.label}
				</MenuItem>
			))}
		</TextField>
	);
};

export default TextInput;

const useStyles = makeStyles((theme) => ({
	root: {},
	inputContainer: {
		width: '100%',
		backgroundColor: theme.palette.grey[50],
		borderRadius: theme.borderRadius.borderRadius8px,
		border: '0.5px solid #ffffff',
		color: theme.palette.common.black,
	},
	textStyle: {
		...theme.typography.textInput,
		borderRadius: theme.borderRadius.borderRadius8px,
	},
	mainBorderColor: {
		// borderColor: theme.palette.primary.main,
		borderColor: '#7E7E7E29',
	},
	errorBorderColor: {
		borderColor: theme.palette.error.main,
	},
	disabledField: {
		border: 'none',
		backgroundColor: theme.palette.background.disabled,
	},
	borderNone: {
		border: 'none',
		backgroundColor: 'transparent',
	},
	menuItem: {
		marginBottom: theme.spacing(5),
		borderRadius: theme.spacing(35),
		marginRight: theme.spacing(25),
		textAlign: 'center',
		marginLeft: theme.spacing(7),
		fontSize: theme.spacing(16),
		justifyContent: 'center',
	},
}));
