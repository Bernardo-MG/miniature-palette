import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { Field, Formik, Form, FieldArray } from 'formik';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import { TextField } from 'formik-material-ui';

import PaintSelector from 'palettes/components/PaintSelector';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

const PaletteSchema = Yup.object().shape({
   name: Yup.string()
      .min(0, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
});

function PaintDialog({ open, onClose, values, onSelect }) {

   function handleSelect(value) {
      onSelect(value);
      onClose();
   }

   return <Dialog aria-labelledby="paint-dialog-title" open={open} onClose={onClose}>
      <DialogTitle id="paint-dialog-title">select_paint</DialogTitle>
      <PaintSelector values={values} onSelect={handleSelect} />
   </Dialog>;
}

PaintDialog.propTypes = {
   open: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
   values: PropTypes.array.isRequired,
   onSelect: PropTypes.func.isRequired
};

function PaletteEditor({ suggestions, initialValues, onSave }) {
   const [open, setOpen] = React.useState(false);

   return <Formik
      onSubmit={onSave}
      initialValues={initialValues}
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
                                       <Field
                                          id={`paints.${index}.name`}
                                          name={`paints.${index}.name`}
                                          required
                                          options={suggestions}
                                          component={TextField}
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
                           <IconButton aria-label="add" onClick={() => setOpen(true)}>
                              <AddCircleIcon />
                           </IconButton>
                           <PaintDialog open={open} values={suggestions}
                              onClose={() => setOpen(false)}
                              onSelect={(value) => arrayHelpers.push({ name: value })} />
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
   suggestions: PropTypes.array.isRequired,
   initialValues: PropTypes.shape({
      name: PropTypes.string,
      paints: PropTypes.array
   }),
   onSave: PropTypes.func.isRequired
};

export default PaletteEditor;
