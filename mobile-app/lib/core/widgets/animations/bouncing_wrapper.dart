import 'package:flutter/material.dart';

class BouncingWrapper extends StatefulWidget {
  final Widget child;
  final double scaleFactor;
  final Duration duration;

  const BouncingWrapper({
    super.key,
    required this.child,
    this.scaleFactor = 0.96,
    this.duration = const Duration(milliseconds: 150),
  });

  @override
  State<BouncingWrapper> createState() => _BouncingWrapperState();
}

class _BouncingWrapperState extends State<BouncingWrapper> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: widget.duration);
    _scaleAnimation = Tween<double>(begin: 1.0, end: widget.scaleFactor).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _onPointerDown(PointerDownEvent event) {
    _controller.forward();
  }

  void _onPointerUp(PointerUpEvent event) {
    _controller.reverse();
  }

  void _onPointerCancel(PointerCancelEvent event) {
    _controller.reverse();
  }

  @override
  Widget build(BuildContext context) {
    return Listener(
      onPointerDown: _onPointerDown,
      onPointerUp: _onPointerUp,
      onPointerCancel: _onPointerCancel,
      child: ScaleTransition(
        scale: _scaleAnimation,
        child: widget.child,
      ),
    );
  }
}
