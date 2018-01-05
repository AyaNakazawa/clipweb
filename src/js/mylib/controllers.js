
// ----------------------------------------------------------------
/**
 * Popover
 * Doc: https://getbootstrap.com/docs/4.0/components/popovers/#options
 * @param  {String}  NAME              Name of Object
 * @param  {String}  selector          Selector of Popover
 * @param  {String}  title             Title of Popover
 * @param  {String}  content           Content of Popover
 * @param  {String}  trigger           Trigger of Popover
 * @param  {String}  placement         Placement of Popover
 * @param  {Number}  delay             Delay of Popover
 * @param  {Boolean} html              Html insert flag of Popover
 * @param  {String}  offset            Offset of Popover
 * @param  {String}  fallbackPlacement Fallback placement of Popover
 * @param  {String}  boundary          Boundary of Popover
 * @return {Popover}                   extends PopoverController, CommonController, Commonclass
**/

class Popover extends PopoverController {
  constructor(
    _model = {}
  ) {
    super(_model);
  }
}
