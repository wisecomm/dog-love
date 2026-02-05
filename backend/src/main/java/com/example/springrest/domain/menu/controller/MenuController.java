package com.example.springrest.domain.menu.controller;

import com.example.springrest.domain.menu.model.dto.MenuRequest;
import com.example.springrest.domain.menu.model.dto.MenuResponse;
import com.example.springrest.domain.menu.service.MenuService;
import com.example.springrest.global.model.dto.ApiResponse;
import com.example.springrest.global.model.dto.PageResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Menu - Menu Management", description = "메뉴 관리 API")
@Slf4j
@RestController
@RequestMapping("/api/v1/mgmt/menus")
@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;

    @Operation(summary = "메뉴 목록 조회")
    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<MenuResponse>>> getMenus(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String menuName,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String useYn,
            @RequestParam(required = false) String sort) {
        return ResponseEntity
                .ok(ApiResponse.success(menuService.getAllMenus(page, size, menuName, category, useYn, sort)));
    }

    @Operation(summary = "메뉴 상세 조회")
    @GetMapping("/{menuId}")
    public ResponseEntity<ApiResponse<MenuResponse>> getMenu(@PathVariable String menuId) {
        MenuResponse menu = menuService.getMenuById(menuId);
        return menu != null ? ResponseEntity.ok(ApiResponse.success(menu)) : ResponseEntity.notFound().build();
    }

    @Operation(summary = "메뉴 생성")
    @PostMapping
    public ResponseEntity<ApiResponse<Void>> createMenu(@Valid @RequestBody MenuRequest request) {
        menuService.createMenu(request);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @Operation(summary = "메뉴 수정")
    @PutMapping("/{menuId}")
    public ResponseEntity<ApiResponse<Void>> updateMenu(@PathVariable String menuId,
            @Valid @RequestBody MenuRequest request) {
        request.setMenuId(menuId);
        menuService.updateMenu(request);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @Operation(summary = "메뉴 삭제")
    @DeleteMapping("/{menuId}")
    public ResponseEntity<ApiResponse<Void>> deleteMenu(@PathVariable String menuId) {
        menuService.deleteMenu(menuId);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
