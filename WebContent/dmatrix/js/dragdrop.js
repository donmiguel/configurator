/*
 * dragdrop for heracles hdragdrop module
 * with jquery
 *
 * Michi Gau and Stieger Dan 2009
 *
 * first revision, only text div s can be handeled - 25th mai
 * 
 *
 * Stieger Dan     dez 09      extended picture support 
 *
 *
 *
 */
 


function UpdateFormField(){
   
  /* save data to input field .... */
  var st = '' + DroppedArray[0];
  for (i = 1; i < (DroppedArray.length-1); i++)
		st += ',' + DroppedArray[i];
  
  document.forms['baseform'].DRAGDROP.value = st;
  //alert('DRAGDROP.value = ' + st);
}
 
 /* check if dom is ready */
$(document).ready(function() { 
	
    if (typeof(DroppedArray) != 'undefined')
    {
        var i = 0;
        
        // check if we can should fix the div ..
        $("#baseDragField").height($("#baseDragField").height());        
        
        // check if images are dragables ... 
        
        /* move objects to target ... if not 0 as init value .... */
        for (i = 0; i < (DroppedArray.length - 1); i++)
            if (DroppedArray[i] != 0)
            {
                dropobj = $( ("#pictarget"+(i+1)) ) [0];
                dragobj = $( ("#pic"+DroppedArray[i]) ) [0];
                
                dropobj.appendChild(dragobj);   
            }
            
        UpdateFormField() ;
        
        /* init dragable objects */
        $(".HDragElement").draggable({helper: 'clone'});
        
        /* initialize all dropable objects */
        for (i = 0; DropTargets[i] != 0; i++)
        { 
            $(DropTargets[i]).droppable({
                accept: ".HDragElement",
                /*activeClass: 'droppable-active',
                  hoverClass: 'droppable-hover',*/
                drop: function(ev, ui) {
                        
                        var dropname = '#' + $(this).attr("id");
                        dropobj = $(dropname)[0];
                        
                        /* check if a picture is already attached to the drop field .. */
                        // alert(dropobj.childNodes.length);
                        
                        /* are there realy 3 objects in the target div ???? */
                        var l = 0;
                        for (; l < dropobj.childNodes.length; l++)
                            if ( (dropobj.childNodes[l].nodeName.toLowerCase().indexOf('div') >= 0) || 
                                  (dropobj.childNodes[l].nodeName.toLowerCase().indexOf('img') >= 0) )
                                ($("#baseDragField")[0]).appendChild(dropobj.lastChild);
                        
                        var dragname = '#' + $(ui.draggable).attr("id")
                        dragobj = $(dragname)[0];
                        dropobj.appendChild(dragobj);
                        
                        /* save id into DroppedArray field .... */
                        var dragid = parseInt(dragobj.id.substring(3, dragobj.id.length)); 
                        var dropid = parseInt(dropobj.id.substring(9, dropobj.id.length));
                        
                        /* check if the field is already in the droppedarray ... */
                        for (l = 0; l < DroppedArray.length; l++)
                            if (DroppedArray[l] == dragid)
                                DroppedArray[l] = 0;
                        
                        DroppedArray[(dropid-1)] = dragid;
                        UpdateFormField() ;
                                               
                        $(".HDragElement").draggable({helper: 'clone'});
                }
            });
         }
        
        $("#baseDragField").droppable({
            accept: ".HDragElement",
            drop: function(ev, ui) {
                var dragname = '#' + $(ui.draggable).attr("id")
                dragobj = $(dragname)[0]
                
                var dropname = '#' + $(this).attr("id")
                dropobj = $(dropname)[0];
                dropobj.appendChild(dragobj);
                
                var dragid = parseInt(dragobj.id.substring(3, dragobj.id.length));
                var j = 0;
                for (; j < (DroppedArray.length-1); j++)
                    if (DroppedArray[j] == dragid)
                        DroppedArray[j] = 0;
                UpdateFormField();
                
                $(".HDragElement").draggable({helper: 'clone'});
            }
        
        }); 
    }
    
});
 