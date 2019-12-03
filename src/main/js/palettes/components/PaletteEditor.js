import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { Field, Formik, Form, FieldArray } from 'formik';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import { TextField } from 'formik-material-ui';

import Autocomplete from '@material-ui/lab/Autocomplete';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

const PaletteSchema = Yup.object().shape({
   name: Yup.string()
      .min(0, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
});

function PaletteEditor({ suggestions, onSave }) {
   return <Formik
      onSubmit={onSave}
      initialValues={{
         name: '',
         paints: []
      }}
      validationSchema={PaletteSchema}>
      {({ values }) => (
         <Form>
            <Card>
               <CardHeader
                  title={
                     <Field
                        name="name"
                        label="palette_name"
                        component={TextField}
                     />
                  }
                  action={
                     <Fragment>
                        <IconButton aria-label="save" type="submit">
                           <SaveIcon />
                        </IconButton>
                     </Fragment>
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
                                       <Autocomplete
                                          freeSolo
                                          id={`paints.${index}`}
                                          disableClearable
                                          options={suggestions}
                                          renderInput={(params) => (
                                             <Field
                                                {...params}
                                                name={`paints.${index}`}
                                                label="paint"
                                                placeholder="write_paint"
                                                margin="normal"
                                                variant="outlined"
                                                fullWidth
                                                component={TextField}
                                             />
                                          )}
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
   onSave: PropTypes.func.isRequired,
   suggestions: PropTypes.array.isRequired
};

export default PaletteEditor;
