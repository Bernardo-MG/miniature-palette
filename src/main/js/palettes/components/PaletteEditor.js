import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { Formik, Form, FieldArray } from 'formik';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

const PaletteSchema = Yup.object().shape({
   name: Yup.string()
      .min(0, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
});

function PaletteEditor({ initialValues, onSave }) {
   return <Formik
      onSubmit={onSave}
      initialValues={initialValues}
      validationSchema={PaletteSchema}>
      {({ values, errors, touched, handleChange, handleBlur }) => (
         <Form>
            <Card>
               <CardHeader
                  title={
                     <TextField
                        name="name"
                        label="palette_name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={(errors.name && touched.name) && errors.name}
                        margin="normal"
                     />
                  }
                  action={
                     <IconButton aria-label="save" type="submit">
                        <SaveIcon />
                     </IconButton>
                  }
               />
               <CardContent>
                  <FieldArray
                     name="paints"
                     render={(arrayHelpers) => (
                        <Fragment>
                           <List>
                              {values.paints.map((paint, index) =>
                                 <ListItem key={index}>
                                    <ListItemText>
                                       <TextField
                                          id={`paints[${index}].name`}
                                          name={`paints[${index}].name`}
                                          label="paint_name"
                                          value={paint.name}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          helperText={(errors.name && touched.name) && errors.name}
                                       />
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                       <IconButton edge="end" aria-label="delete" onClick={() => arrayHelpers.remove(index)}>
                                          <DeleteIcon />
                                       </IconButton>
                                    </ListItemSecondaryAction>
                                 </ListItem>
                              )}
                           </List>
                           <IconButton aria-label="add" onClick={() => arrayHelpers.push({ name: '' })}>
                              <AddCircleIcon />
                           </IconButton>
                        </Fragment>
                     )}
                  />
               </CardContent>
            </Card>
         </Form>
      )}
   </Formik>;
}

PaletteEditor.propTypes = {
   initialValues: PropTypes.shape({
      name: PropTypes.string,
      paints: PropTypes.array
   }),
   onSave: PropTypes.func.isRequired
};

export default PaletteEditor;
