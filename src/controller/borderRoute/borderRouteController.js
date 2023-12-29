const db = require("../../model");
const errorResponce = require("../../responses/ErrorResponce");
const successResponce = require("../../responses/successResponce");

const borderRoutes = db.borderRoutes 
const borders = db.border 

// Controller functions for managing routes and borders
const routeController = {
  // Create a new route with borders
  createRoute: async (req, res) => {
    try {
      const { originCountry, originState, originCity, destinationCountry, destinationState, destinationCity, totalFare, border , border_id } = req.body;

      // Create the route
      const newRoute = await borderRoutes.create({
        originCountry,
        originState,
        originCity,
        destinationCountry,
        destinationState,
        destinationCity,
        totalFare,
        border_id
      });

      // Add borders to the route
      if (border && border.length > 0) {
        const routeBorders = await Promise.all(
          border.map(async (Newborder) => {
            const createdBorder = await borders.create(Newborder);
            return createdBorder;
          })
        );

        // await newRoute.addRouteBorders(routeBorders);
      }

      res.status(201).json({ success: true, message: 'borderRoutes created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  // Get all routes with borders
  getAllRoutes: async (req, res) => {
    borderRoutes.belongsTo(borders, { foreignKey: 'border_id' });


    try {
      const routes = await borderRoutes.findAll({
        include: [{ model: borders, }],
      });

      res.status(200).json({ success: true, routes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  // Get a route by ID with borders
  getRouteById: async (req, res) => {
    try {
      const { id } = req.params;

      const route = await borderRoutes.findByPk(id, {
        include: [{ model: border, as: 'routeBorders' }],
      });

      if (!route) {
        return res.status(404).json({ success: false, message: 'borderRoutes not found' });
      }

      res.status(200).json({ success: true, route });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  // Update a route by ID
  updateRouteById: async (req, res) => {
    try {
      const { id } = req.params;
      const { originCountry, originState, originCity, destinationCountry, destinationState, destinationCity, totalFare, borders } = req.body;

      const route = await borderRoutes.findByPk(id);

      if (!route) {
        return res.status(404).json({ success: false, message: 'borderRoutes not found' });
      }

      // Update route details
      await route.update({
        originCountry,
        originState,
        originCity,
        destinationCountry,
        destinationState,
        destinationCity,
        totalFare,
      });

      // Update borders
      if (borders && borders.length > 0) {
        // Delete existing borders
        await route.removeRouteBorders(route.routeBorders);

        // Create and associate new borders
        const routeBorders = await Promise.all(
          borders.map(async (border) => {
            const createdBorder = await borders.create(border);
            return createdBorder;
          })
        );

        await route.addRouteBorders(routeBorders);
      }

      res.status(200).json({ success: true, message: 'borderRoutes updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },

  // Delete a route by ID
  deleteRouteById: async (req, res) => {
    try {
      const { id } = req.params;

      const route = await borderRoutes.findByPk(id);

      if (!route) {
        return res.status(404).json({ success: false, message: 'borderRoutes not found' });
      }

      // Delete associated borders
      await route.removeRouteBorders(route.routeBorders);

      // Delete the route
      await route.destroy();

      res.status(200).json({ success: true, message: 'borderRoutes deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
  createBorder : async (req, res) =>{
    try {
      const newBorder = await  db.border.create(req.body)
      successResponce(res , "new border added" , newBorder,201 )
    } catch (error) {
      errorResponce(res , 500 , error , "" )
    }
  }
}



module.exports = routeController;
