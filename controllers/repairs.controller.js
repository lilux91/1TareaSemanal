const Repair = require('../models/repair.model');

exports.findRepairs = async (req, res) => {
  //const { param1, param2 } = req.params;

  try {
    const repairs = await Repair.findAll({
      where: {
        status: true,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'The repairs found were successfully',
      repairs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.findRepair = async (req, res) => {
  try {
    const { id } = req.params;

    const repair = await Repair.findOne({
      where: {
        id,
        status: true,
      },
    });

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'The repair was not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'The repair was found successfully',
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.createRepair = async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    const newRepair = await Repair.create({
      name: name.toLowerCase(),
      price,
      stock,
    });

    res.status(201).json({
      status: 'success',
      message: 'The repair was created successfully',
      newRepair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.updateRepair = async (req, res) => {
  try {
    //1. OBTENGO MI ID DE LA REQ.PARAMS
    const { id } = req.params;
    //2. OBTENER LA INFORMACION A ACTUALIZAR DE LA REQ.BODY
    const { name, price, stock } = req.body;
    //3. BUSCAR LA REPARACION A ACTUALIZAR
    const repair = await Repair.findOne({
      where: {
        id,
        status: true,
      },
    });
    //4. SI NO EXISTE LA REPARACION ENVIAMOS UN ERROR
    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'The repair was not found',
      });
    }
    //5. SI TODO SALIO BIEN, ACTUALIZAMOS LA REPARACION ENCONTRADO
    const updatedRepair = await repair.update({
      name,
      price,
      stock,
    });
    //6. ENVIO LA RESPUESTA AL CLIENTE
    res.status(200).json({
      status: 'success',
      message: 'Then repair has been updated successfully',
      updatedRepair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.deleteRepair = async (req, res) => {
  try {
    //1. OBTENGO EL ID DE LA REQ.PARAMS
    const { id } = req.params;
    //2. BUSCAR EL PRODUCTO A ELIMINAR
    const repair = await Repair.findOne({
      where: {
        id,
        status: true,
      },
    });

    //3. ENVIAR UN ERROR SI LA REPARACION NO SE ENCUENTRA
    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'The repair was not found',
      });
    }
    //4. ACTUALIZAR EL ESTADO DE LA REPARACION A FALSE
    await repair.update({ status: false });
    //await product.destroy();

    //5. ENVIAR LA RESPUESTA AL CLIENTE

    res.status(200).json({
      status: 'success',
      message: 'Cancel a user repair',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};
