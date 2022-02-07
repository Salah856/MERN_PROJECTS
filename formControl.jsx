  <FormControl sx={{ m: 1, minWidth: 420, }}>
										<InputLabel
											id="demo-controlled-open-select-label"
											style={{
												marginTop: '-1rem',
                                                marginLeft: '2.7rem',
											}}
										>
											Select Language
										</InputLabel>
										<Select
											labelId="demo-controlled-open-select-label"
											id="demo-controlled-open-select"
											//onClose={handleClose}
											//onOpen={handleOpen}
											//value={botLanguage}
											label="Topic Flow"
											style={{
												width: '38.75rem',
												height: '2.5rem',
												marginTop: '-0.3rem',
                                                marginLeft: '1.8rem',
											}}
											onChange={(e) => {
                                                setShowCheckBox(false);
                                            }}
										>
											<MenuItem value="English">
                                                {
                                                    showCheckBox ?
                                                    (
                                                    <Checkbox color="primary">
                                                    {/*  */}
                                                    </Checkbox>
                                                    ) : 
                                                    null
                                                    }
												
                                                English
                                                 
											</MenuItem>
											<MenuItem value="Arabic">
                                            {
                                                showCheckBox ?
                                                    (
                                                    <Checkbox color="primary">
                                                    {/*  */}
                                                    </Checkbox>
                                                    ) : 
                                                    null
                                            }
                                                Arabic
											</MenuItem>
										</Select>
                        </FormControl>
