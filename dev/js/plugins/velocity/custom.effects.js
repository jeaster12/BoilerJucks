/*  ==========================================================================
    Table of Content for Velocity Custom Effects:

    === Function ===
	- runCalloutcupcakePulse
    - runTransitioncupcakeFlipX
    - runTransitioncupcakeSlide

    --------------------------
    === Function Calls ===

    ========================================================================== */


/*  ==========================================================================
    Functions
    ========================================================================== */

/*
    runCalloutcupcakePulse
    ========================================================================== */
function runCalloutcupcakePulse(){

    $.Velocity.RegisterEffect("callout.cupcake.pulse", {
        defaultDuration: 900,
        calls: [
            [ { scaleX: 1.1 }, 0.50 ],
            [ { scaleX: 1 }, 0.50 ]
        ]
    });

}

/*
    runTransitioncupcakeFlipX
    ========================================================================== */
function runTransitioncupcakeFlipX(){

    $.Velocity
        .RegisterEffect("transition.cupcake.flipXIn", {
            defaultDuration: 700,
            calls: [
                [ { opacity: 1, rotateY: [ 0, -55 ] } ]
            ]
        })
        .RegisterEffect("transition.cupcake.flipXOut", {
            defaultDuration: 700,
            calls: [
                [ { opacity: 0, rotateY: 55 } ]
            ],
            reset: { rotateY: 0 }
        });
}

/*
    runTransitioncupcakeTin
    ========================================================================== */
function runTransitioncupcakeSlide(){

    $.Velocity
        .RegisterEffect("transition.cupcake.slideRightIn", {
            defaultDuration: 800,
                calls: [
                [ { translateX: [ 0, 40 ], translateZ: 0 } ]
            ]
        })
        .RegisterEffect("transition.cupcake.slideLeftIn", {
            defaultDuration: 600,
                calls: [
                [ { opacity: [ 1, 0.70 ], translateX: [ 0, -40 ], translateZ: 0 } ]
            ]
        });

}


/*  ==========================================================================
    Function Calls
   	========================================================================== */

$(function(){

    // Variables

    // === Checkers ===

    // === Setters ===

    // === Executions ===

    runCalloutcupcakePulse();
    runTransitioncupcakeFlipX();
    runTransitioncupcakeSlide();

});