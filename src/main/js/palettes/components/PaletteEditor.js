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

import SuggestionInput from 'common/components/SuggestionInput';

const PaletteSchema = Yup.object().shape({
   name: Yup.string()
      .min(0, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
});

function PaintInput({ suggestions, value }) {
   return <SuggestionInput
      suggestions={suggestions}
      label={'paint'}
      placeholder={'write_paint'}
      // onChange={onChange}
      initial={value}
   />;
}

PaintInput.propTypes = {
   suggestions: PropTypes.array.isRequired,
   value: PropTypes.string.isRequired
};

function PaletteEditor({ suggestions, onSave }) {
   return <Formik
      onSubmit={onSave}
      initialValues={{
         name: '',
         paints: []
      }}
      validationSchema={PaletteSchema}>
      {({ values, errors, touched, handleChange, handleBlur }) => (
         <Form>
            <Card>
               <CardHeader
                  title={
                     <TextField name="name" label="palette_name" value={values.name} onChange={handleChange} onBlur={handleBlur}
                        helperText={(errors.name && touched.name) && errors.name} />
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
                              {values.paints.map((color, index) =>
                                 <ListItem key={color.name + index}>
                                    <ListItemText>
                                       <PaintInput suggestions={suggestions} value={color.name} />
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                       <IconButton edge="end" aria-label="delete" onClick={() => arrayHelpers.remove(index)}>
                                          <DeleteIcon />
                                       </IconButton>
                                    </ListItemSecondaryAction>
                                 </ListItem>
                              )}
                           </List>
                           <IconButton aria-label="add" onClick={() => arrayHelpers.push({})}>
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
   suggestions: PropTypes.array.isRequired,
   onAdd: PropTypes.func.isRequired,
   onDelete: PropTypes.func.isRequired
};

export default PaletteEditor;
