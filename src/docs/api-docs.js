/**
 * @swagger
 * /user/signup:
 *   post:
 *     tags:
 *       - Onboarding
 *     description: Creates a new user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:              # request parameters
 *       -  name: sign up               # request body
 *          in: body          # name of request, can be any name
 *          description: It enables a user to create an account
 *          required: true        
 *          schema:                # Schema definition
 *              #$ref: '#/definitions/User'
 *              type: object
 *              properties:
 *                  firstName:
 *                      type: string
 *                  lastName:
 *                      type: string
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *                      format: password
 *                  required:
 *                      - email
 *                      - firstName
 *                      - lastName
 *                      - password
 *     responses:
 *       201:
 *          description: Account created successfully.       
 *       400:
 *         description: Request body is missing
 *       409:
 *         description: Mail exists
 * 
 *
 * 
 * /user/signin:
 *   post:
 *     tags:
 *       - Onboarding
 *     description: Signs in a user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:              # request parameters
 *       -  name: sign up               # request body
 *          in: body          # name of request, can be any name
 *          description: It signs in a user   
 *          schema:
 *              #$ref: '#/definitions/User'
 *              type: object
 *              properties:
 *                  email:
 *                     type: string
 *                  password:
 *                     type: string
 *                     format: password
 *          required:
 *              - username
 *              - password
 *     responses:
 *       200:
 *          description: Auth successful        
 *       400:
 *         description: A user with that email address does not exist
 *       401:
 *         description: Auth failed
 *  
 * 
 * 
 * /admin/create-team:
 *   post:
 *     tags:
 *       - Teams
 *     description: create a team
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:              # request parameters
 *       -  name: sign up               # request body
 *          in: body          # name of request, can be any name
 *          description: creates a new team   
 *          schema:
 *              #$ref: '#/definitions/Team'
 *              type: object
 *              properties:
 *                  teamName:
 *                     type: string
 *                  matchPlayed:
 *                     type: number
 *                  points:
 *                     type: number
 *                  teamCode:
 *                     type: string
 *          required:
 *              - teamName
 *              - matchPlayed
 *              - points
 *              - teamCode
 *     responses:
 *       200:
 *          description: Team successfully created        
 *       409:
 *         description: Team already exists
 * 
 * 
 * 
 * 
 * /admin/get-teams:
 *   get:
 *     tags:
 *       - Teams
 *     description: Get all teams
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *          success: true
 * 
 * 
 * /user/get-teams:
 *   get:
 *     tags:
 *       - Users
 *     description: Get all teams
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *          success: true
 *
 * 
 * 
 * /user/get-team/{teamCode}:
 *   get:
 *     tags:
 *       - Users
 *     description: get one team
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *          success: true
 *
 * 
 * 
 * 
 * /admin/edit-team:
 *   put:
 *     tags:
 *       - Teams
 *     description: editing a team
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:              # request parameters
 *       -  name: edits a team               # request body
 *          in: body          # name of request, can be any name
 *          description: params needed to place an order   
 *          schema:
 *              #$ref: '#/definitions/Team'
 *              type: object
 *              properties:
 *                  teamCode:
 *                     type: string
 *          required:
 *              - teamCode
 *     responses:
 *       200:
 *          description: Team successfully edited       
 *       400:
 *         description: Request body or url parameter is missing
 *
 *
 *
 * /admin/delete-team/{teamCode}:
 *   delete:
 *     tags:
 *       - Teams
 *     description: editing a team
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *          description: Team successfully deleted
 * 
 * 
 * 
 * 
 * 
 * /admin/add-fixtures:
 *   post:
 *     tags:
 *       - Fixtures
 *     description: add a fixtures
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:              # request parameters
 *       -  name: sign up               # request body
 *          in: body          # name of request, can be any name
 *          description: adds a new fixtures   
 *          schema:
 *              #$ref: '#/definitions/Fixtures'
 *              type: object
 *              properties:
 *                  homeTeam:
 *                     type: string
 *                  awayTeam:
 *                     type: string
 *                  matchDate:
 *                     type: string
 *                  scoreLine:
 *                     type: number
 *                  status:
 *                     type: string
 *                  uniqueURL:
 *                     type: string
 *          required:
 *              - homeTeam
 *              - awayTeam
 *              - matchDate
 *              - scoreLine
 *              - status
 *              - uniqueURL
 *     responses:
 *       200:
 *          description: Fixtures successfully added        
 *       409:
 *         description: Fixtures already exists
 * 
 * 
 * /admin/get-fixtures:
 *   get:
 *     tags:
 *       - Fixtures
 *     description: Get all fixtures
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *          success: true
 * 
 * 
 * /user/get-pending-fixtures:
 *   get:
 *     tags:
 *       - Users
 *     description: Get all pending fixtures
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *          success: true
 * 
 * 
 * 
 * /user/get-completed-fixtures:
 *   get:
 *     tags:
 *       - Users
 *     description: Get all completed fixtures
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *          success: true
 * 
 * 
 * /admin/edit-fixtures:
 *   put:
 *     tags:
 *       - Fixtures
 *     description: editing a fixtures
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:              # request parameters
 *       -  name: edits a fixtures               # request body
 *          in: body          # name of request, can be any name
 *          description: params needed for editing a fixtures
 *          schema:
 *              #$ref: '#/definitions/Fixtures'
 *              type: object
 *              properties:
 *                  homeTeam:
 *                     type: string
 *          required:
 *              - homeTeam
 *     responses:
 *       200:
 *          description: Fixtures successfully edited       
 *       400:
 *         description: Request body or url parameter is missing
 * 
 * 
 * 
 * /admin/delete-fixture/{uniqueUrl}:
 *   delete:
 *     tags:
 *       - Fixtures
 *     description: deleting a fixture
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *          description: Fixtures successfully deleted
 * 
 *
 */